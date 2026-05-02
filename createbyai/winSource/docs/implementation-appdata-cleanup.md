# AppData 智能清理 - 实现原理

## 功能描述
智能清理 AppData 文件夹中的缓存和临时文件，同时保护用户配置和重要数据。

---

## 核心原理

### 1. AppData 目录结构

```
C:\Users\{用户名}\AppData\
├── Local/              # 本地数据（缓存、临时文件）
│   ├── Temp/           # 临时文件（可安全删除）
│   ├── Microsoft/      # 微软应用数据
│   ├── Google/         # Chrome 数据
│   └── ...
├── LocalLow/           # 低权限数据
└── Roaming/            # 漫游数据（配置、书签）
    ├── Microsoft/      # 微软配置
    ├── Mozilla/        # Firefox 配置
    └── ...
```

### 2. 安全清理规则库

**白名单机制 - 不可删除的目录：**
```csharp
public static class AppDataProtectionRules
{
    // 绝对不可删除的目录（包含用户配置）
    public static readonly string[] ProtectedDirs = new[]
    {
        // 浏览器配置
        @"AppData\Roaming\Mozilla",           // Firefox 配置
        @"AppData\Roaming\Google\Chrome\User Data",  // Chrome 用户数据
        @"AppData\Local\Google\Chrome\User Data",    // Chrome 用户数据
        
        // 通讯软件
        @"AppData\Roaming\Tencent",           // QQ/微信配置
        @"AppData\Local\Tencent",             // QQ/微信数据
        
        // 系统配置
        @"AppData\Roaming\Microsoft\Windows\Start Menu",  // 开始菜单
        @"AppData\Roaming\Microsoft\Office",  // Office 配置
        
        // 开发工具
        @"AppData\Local\Git",                 // Git 配置
        @"AppData\Roaming\npm",               // npm 全局包
    };
    
    // 可安全清理的目录
    public static readonly string[] SafeToCleanDirs = new[]
    {
        @"AppData\Local\Temp",                // 临时文件
        @"AppData\Local\Microsoft\Windows\INetCache",  // 浏览器缓存
        @"AppData\Local\Microsoft\Windows\WER",        // 错误报告
        @"AppData\Local\CrashDumps",          // 崩溃转储
        @"AppData\Local\Microsoft\Windows\Explorer\ThumbCache", // 缩略图缓存
    };
}
```

### 3. 智能识别机制

**软件特征识别：**
```csharp
public class AppDataAnalyzer
{
    // 软件特征库
    private static readonly Dictionary<string, SoftwareInfo> SoftwareProfiles = new()
    {
        {
            "Chrome", new SoftwareInfo
            {
                Paths = new[]
                {
                    @"AppData\Local\Google\Chrome\User Data\Default\Cache",
                    @"AppData\Local\Google\Chrome\User Data\Default\Code Cache"
                },
                ProtectedPaths = new[]
                {
                    @"AppData\Local\Google\Chrome\User Data\Default\Bookmarks",
                    @"AppData\Local\Google\Chrome\User Data\Default\Login Data"
                }
            }
        },
        {
            "WeChat", new SoftwareInfo
            {
                Paths = new[]
                {
                    @"AppData\Local\Tencent\WeChat\XPlugin",
                    @"AppData\Roaming\Tencent\WeChat\Cache"
                },
                ProtectedPaths = new[]
                {
                    @"AppData\Roaming\Tencent\WeChat\All Users\config",
                    @"AppData\Roaming\Tencent\WeChat\All Users\CMEUserData"
                }
            }
        }
    };
    
    public CleanupPlan Analyze(string appDataPath)
    {
        var plan = new CleanupPlan();
        
        foreach (var (name, profile) in SoftwareProfiles)
        {
            // 检查软件是否存在
            foreach (var path in profile.ProtectedPaths)
            {
                var fullPath = Path.Combine(appDataPath, path);
                if (Directory.Exists(fullPath) || File.Exists(fullPath))
                {
                    // 软件已安装，记录可清理路径
                    foreach (var cleanPath in profile.Paths)
                    {
                        plan.SafeToDelete.Add(Path.Combine(appDataPath, cleanPath));
                    }
                    plan.ProtectedPaths.AddRange(profile.ProtectedPaths);
                    break;
                }
            }
        }
        
        return plan;
    }
}
```

### 4. 安全删除操作

**带备份的删除：**
```csharp
public class SafeFileDeleter
{
    private readonly string _backupPath;
    
    public SafeFileDeleter(string backupPath)
    {
        _backupPath = backupPath;
    }
    
    public async Task<CleanupResult> DeleteAsync(string path, bool dryRun = false)
    {
        var result = new CleanupResult { Path = path };
        
        try
        {
            // 检查是否受保护
            if (IsProtected(path))
            {
                result.Status = CleanupStatus.Protected;
                return result;
            }
            
            if (dryRun)
            {
                // 模拟删除，计算可释放空间
                result.EstimatedSize = GetSize(path);
                result.Status = CleanupStatus.Simulated;
                return result;
            }
            
            // 备份
            await BackupAsync(path);
            
            // 删除
            if (Directory.Exists(path))
            {
                Directory.Delete(path, true);
            }
            else if (File.Exists(path))
            {
                File.Delete(path);
            }
            
            result.Status = CleanupStatus.Success;
        }
        catch (Exception ex)
        {
            result.Status = CleanupStatus.Failed;
            result.Error = ex.Message;
        }
        
        return result;
    }
    
    private bool IsProtected(string path)
    {
        return AppDataProtectionRules.ProtectedDirs
            .Any(protectedDir => path.Contains(protectedDir, StringComparison.OrdinalIgnoreCase));
    }
    
    private async Task BackupAsync(string source)
    {
        if (!Directory.Exists(_backupPath))
        {
            Directory.CreateDirectory(_backupPath);
        }
        
        var backupTarget = Path.Combine(_backupPath, Path.GetFileName(source));
        await Task.Run(() =>
        {
            if (Directory.Exists(source))
            {
                CopyDirectory(source, backupTarget);
            }
        });
    }
}
```

### 5. 文件类型过滤

**按扩展名筛选可删除文件：**
```csharp
public static class FileTypeFilter
{
    // 可安全删除的临时文件扩展名
    public static readonly string[] SafeExtensions = new[]
    {
        ".tmp", ".temp", ".log", ".cache", ".bak", ".old",
        ".dmp", ".pdb", ".ilk", ".obj", ".exe"
    };
    
    // 浏览器缓存文件
    public static readonly string[] BrowserCacheExtensions = new[]
    {
        ".cache", ".db", ".wal", ".shm"
    };
    
    public static bool IsSafeToDelete(string filePath)
    {
        var ext = Path.GetExtension(filePath).ToLowerInvariant();
        return SafeExtensions.Contains(ext);
    }
}
```

### 6. 获取 AppData 路径

```csharp
public static class AppDataHelper
{
    public static string GetLocalAppDataPath()
    {
        return Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
    }
    
    public static string GetRoamingAppDataPath()
    {
        return Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
    }
    
    public static string GetLocalAppDataLowPath()
    {
        return Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) + @"\LocalLow";
    }
}
```

---

## 清理流程

```
1. 扫描 AppData 目录
   ↓
2. 识别已安装的软件
   ↓
3. 应用保护规则（标记不可删除的目录）
   ↓
4. 计算可清理空间
   ↓
5. 生成清理报告（显示给用户）
   ↓
6. 用户确认后执行清理
   ↓
7. 备份重要数据
   ↓
8. 执行删除
   ↓
9. 记录操作日志
```

---

## 风险控制

### 1. 干跑模式（Dry Run）
```csharp
// 先模拟清理，显示用户可以释放多少空间
var result = await cleaner.DeleteAsync(path, dryRun: true);
Console.WriteLine($"可释放: {result.EstimatedSize / 1024 / 1024} MB");
```

### 2. 系统还原点
```csharp
public class RestorePointManager
{
    [DllImport("srclient.dll")]
    private static extern int SRSetRestorePoint(ref RESTOREPOINTINFO rp, ref STATEMGRSTATUS status);
    
    public static bool CreateRestorePoint(string description)
    {
        var rp = new RESTOREPOINTINFO
        {
            dwEventType = 100,  // 开始还原点
            dwRestorePtType = 0,  // 应用程序安装
            llSequenceNumber = 0,
            szDescription = description
        };
        
        var status = new STATEMGRSTATUS();
        return SRSetRestorePoint(ref rp, ref status) == 1;
    }
}
```

### 3. 操作日志
```csharp
public class CleanupLogger
{
    private readonly string _logFile;
    
    public void LogOperation(string operation, string path, long size, bool success)
    {
        var logEntry = new
        {
            Timestamp = DateTime.Now,
            Operation = operation,
            Path = path,
            Size = size,
            Success = success
        };
        
        File.AppendAllText(_logFile, JsonConvert.SerializeObject(logEntry) + "\n");
    }
}
```
