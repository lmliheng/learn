# 磁盘存储结构分析 - 实现原理

## 功能描述
扫描磁盘目录结构，计算每个文件夹的大小，并以可视化方式展示磁盘使用情况。

---

## 核心原理

### 1. 目录大小计算

**Windows API 方式：**
```csharp
// 使用 DirectoryInfo 递归计算
public static long GetDirectorySize(DirectoryInfo dir)
{
    long size = 0;
    try
    {
        // 累加所有文件大小
        foreach (FileInfo file in dir.GetFiles("*", SearchOption.AllDirectories))
        {
            size += file.Length;
        }
    }
    catch (UnauthorizedAccessException)
    {
        // 跳过无权限访问的目录
    }
    return size;
}
```

**高性能方式（异步 + 并行）：**
```csharp
public async Task<long> GetDirectorySizeAsync(DirectoryInfo dir)
{
    long size = 0;
    var tasks = new List<Task<long>>();
    
    try
    {
        var files = dir.EnumerateFiles();
        foreach (var file in files)
        {
            try
            {
                size += file.Length;
            }
            catch { }
        }
        
        var subDirs = dir.EnumerateDirectories();
        foreach (var subDir in subDirs)
        {
            tasks.Add(GetDirectorySizeAsync(subDir));
        }
        
        var results = await Task.WhenAll(tasks);
        size += results.Sum();
    }
    catch { }
    
    return size;
}
```

### 2. 文件系统枚举优化

**使用 EnumerateFiles 而非 GetFiles：**
- `GetFiles()` 会一次性加载所有文件到内存
- `EnumerateFiles()` 使用延迟加载，内存占用更低

```csharp
// 推荐方式 - 延迟枚举
foreach (var file in dir.EnumerateFiles("*", SearchOption.TopDirectoryOnly))
{
    // 逐个处理
}
```

### 3. 获取磁盘基本信息

**使用 DriveInfo：**
```csharp
var drives = DriveInfo.GetDrives();
foreach (var drive in drives)
{
    if (drive.IsReady)
    {
        Console.WriteLine($"盘符: {drive.Name}");
        Console.WriteLine($"类型: {drive.DriveType}");
        Console.WriteLine($"文件系统: {drive.DriveFormat}");
        Console.WriteLine($"总大小: {drive.TotalSize}");
        Console.WriteLine($"可用空间: {drive.AvailableFreeSpace}");
    }
}
```

**使用 WMI 获取更详细信息：**
```csharp
using System.Management;

public class DiskInfo
{
    public static List<DriveInfo> GetDriveDetails()
    {
        var drives = new List<DriveInfo>();
        using (var searcher = new ManagementObjectSearcher(
            "SELECT * FROM Win32_LogicalDisk WHERE DriveType=3"))
        {
            foreach (ManagementObject disk in searcher.Get())
            {
                drives.Add(new DriveInfo
                {
                    DeviceID = disk["DeviceID"].ToString(),
                    VolumeName = disk["VolumeName"]?.ToString(),
                    FileSystem = disk["FileSystem"]?.ToString(),
                    Size = Convert.ToUInt64(disk["Size"]),
                    FreeSpace = Convert.ToUInt64(disk["FreeSpace"])
                });
            }
        }
        return drives;
    }
}
```

### 4. 核心系统目录识别

**Windows 核心目录清单：**
```csharp
public static class SystemDirectories
{
    // C 盘核心目录
    public static readonly string[] WindowsCoreDirs = new[]
    {
        @"C:\Windows",                    // 系统核心
        @"C:\Windows\System32",           // 系统文件
        @"C:\Windows\WinSxS",             // 组件存储
        @"C:\Program Files",              // 64位程序
        @"C:\Program Files (x86)",        // 32位程序
        @"C:\ProgramData",                // 程序数据
        @"C:\Users",                      // 用户目录
    };
    
    // 用户资源目录
    public static readonly string[] UserDirs = new[]
    {
        @"C:\Users\{0}\AppData",          // 应用数据
        @"C:\Users\{0}\Desktop",          // 桌面
        @"C:\Users\{0}\Documents",        // 文档
        @"C:\Users\{0}\Downloads",        // 下载
        @"C:\Users\{0}\Pictures",         // 图片
    };
}
```

### 5. 树形结构构建

**目录树节点模型：**
```csharp
public class DirectoryNode
{
    public string Name { get; set; }
    public string FullPath { get; set; }
    public long Size { get; set; }
    public int FileCount { get; set; }
    public int FolderCount { get; set; }
    public List<DirectoryNode> Children { get; set; } = new();
    public bool IsSystemDir { get; set; }
    public bool IsScanned { get; set; }
}
```

**递归构建树：**
```csharp
public async Task<DirectoryNode> BuildDirectoryTreeAsync(string path, int maxDepth = 3)
{
    var node = new DirectoryNode
    {
        Name = Path.GetFileName(path) ?? path,
        FullPath = path
    };
    
    if (maxDepth <= 0) return node;
    
    try
    {
        var dir = new DirectoryInfo(path);
        node.Size = await GetDirectorySizeAsync(dir);
        node.FileCount = dir.EnumerateFiles("*", SearchOption.AllDirectories).Count();
        
        foreach (var subDir in dir.EnumerateDirectories())
        {
            var child = await BuildDirectoryTreeAsync(subDir.FullName, maxDepth - 1);
            node.Children.Add(child);
        }
    }
    catch { }
    
    return node;
}
```

---

## 性能优化策略

### 1. 多线程扫描
```csharp
// 并行扫描多个一级目录
var topDirs = new[] 
{
    @"C:\Windows",
    @"C:\Program Files",
    @"C:\Program Files (x86)",
    @"C:\Users"
};

var tasks = topDirs.Select(dir => ScanDirectoryAsync(dir));
var results = await Task.WhenAll(tasks);
```

### 2. 缓存机制
```csharp
// 使用内存缓存避免重复扫描
private ConcurrentDictionary<string, DirectoryCache> _cache = new();

public class DirectoryCache
{
    public long Size { get; set; }
    public DateTime LastScan { get; set; }
    public bool IsValid => (DateTime.Now - LastScan).TotalMinutes < 30;
}
```

### 3. 跳过系统保护目录
```csharp
private static readonly string[] SkipDirs = new[]
{
    "System Volume Information",
    "$Recycle.Bin",
    "Recovery",
    "Config.Msi"
};

public bool ShouldSkipDirectory(string dirName)
{
    return SkipDirs.Contains(dirName, StringComparer.OrdinalIgnoreCase);
}
```

---

## 数据展示方案

### 1. 饼图/环形图 - 显示各目录占比
```csharp
// 计算百分比
public double GetPercentage(long dirSize, long totalSize)
{
    return totalSize > 0 ? (double)dirSize / totalSize * 100 : 0;
}
```

### 2. 树形表格 - 显示层级结构
| 目录名 | 大小 | 文件数 | 占比 |
|--------|------|--------|------|
| Windows | 25GB | 150,000 | 45% |
| Program Files | 15GB | 80,000 | 27% |
| Users | 12GB | 200,000 | 22% |

### 3. 热力图/矩形树图
- 面积越大表示占用空间越大
- 颜色深浅表示目录类型（系统/用户/应用）

---

## 异常处理

### 1. 权限不足
```csharp
try
{
    // 扫描操作
}
catch (UnauthorizedAccessException ex)
{
    // 记录日志，跳过该目录
    _logger.LogWarning("无权限访问: {Path}", ex.Message);
}
```

### 2. 路径过长
```csharp
// 启用长路径支持（Windows 10+）
// 或使用 \\?\ 前缀
var longPath = @"\\?\" + path;
```

### 3. 文件被占用
```csharp
try
{
    var size = file.Length;
}
catch (IOException)
{
    // 文件被其他进程占用，跳过
}
```
