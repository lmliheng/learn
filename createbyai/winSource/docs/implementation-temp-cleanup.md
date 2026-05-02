# 临时文件清理 - 实现原理

## 功能描述
清理 Windows 系统和应用程序产生的临时文件，释放磁盘空间。

---

## 核心原理

### 1. 临时文件位置

**主要临时文件目录：**
```csharp
public static class TempPaths
{
    // 系统临时文件
    public static string SystemTemp => Path.GetTempPath();  // C:\Users\{用户}\AppData\Local\Temp
    
    // Windows 更新缓存
    public static string WindowsUpdate => @"C:\Windows\SoftwareDistribution\Download";
    
    // Windows 错误报告
    public static string WindowsErrorReports => @"C:\ProgramData\Microsoft\Windows\WER";
    
    // Windows 预读取文件
    public static string Prefetch => @"C:\Windows\Prefetch";
    
    // 缩略图缓存
    public static string ThumbnailCache => @"C:\Users\{用户}\AppData\Local\Microsoft\Windows\Explorer";
    
    // DNS 缓存
    public static string DnsCache => "DNS Cache (通过命令清理)";
    
    // 回收站
    public static string RecycleBin => "Recycle Bin (通过 COM 接口清理)";
}
```

### 2. 临时文件类型识别

**按扩展名分类：**
```csharp
public static class TempFileTypes
{
    public static readonly string[] TempExtensions = new[]
    {
        ".tmp", ".temp", ".log", ".bak", ".old", ".cache",
        ".dmp", ".pdb", ".ilk", ".obj", ".lib",
        ".chk", ".gid", ".syd", ".fts", ".xlk"
    };
    
    public static bool IsTempFile(string filePath)
    {
        var ext = Path.GetExtension(filePath).ToLowerInvariant();
        return TempExtensions.Contains(ext);
    }
}
```

### 3. 扫描临时文件

```csharp
public class TempFileScanner
{
    public async Task<List<TempFileInfo>> ScanAsync(string directory, CancellationToken ct = default)
    {
        var tempFiles = new List<TempFileInfo>();
        
        if (!Directory.Exists(directory))
            return tempFiles;
        
        try
        {
            var dir = new DirectoryInfo(directory);
            
            // 扫描文件（并行处理提高性能）
            var files = await Task.Run(() => 
                dir.EnumerateFiles("*", SearchOption.AllDirectories)
                   .Where(f => IsTempFile(f.Name)), ct);
            
            foreach (var file in files)
            {
                ct.ThrowIfCancellationRequested();
                
                try
                {
                    tempFiles.Add(new TempFileInfo
                    {
                        Path = file.FullName,
                        Size = file.Length,
                        LastModified = file.LastWriteTime,
                        Category = CategorizeFile(file.Name)
                    });
                }
                catch
                {
                    // 文件被占用或无权限，跳过
                }
            }
        }
        catch (UnauthorizedAccessException)
        {
            // 无权限访问
        }
        
        return tempFiles;
    }
    
    private TempFileCategory CategorizeFile(string fileName)
    {
        if (fileName.EndsWith(".tmp") || fileName.EndsWith(".temp"))
            return TempFileCategory.Application;
        if (fileName.EndsWith(".log"))
            return TempFileCategory.Log;
        if (fileName.EndsWith(".dmp"))
            return TempFileCategory.Dump;
        if (fileName.EndsWith(".cache"))
            return TempFileCategory.Cache;
        
        return TempFileCategory.Other;
    }
}

public class TempFileInfo
{
    public string Path { get; set; }
    public long Size { get; set; }
    public DateTime LastModified { get; set; }
    public TempFileCategory Category { get; set; }
}

public enum TempFileCategory
{
    Application,  // 应用临时文件
    Log,          // 日志文件
    Dump,         // 崩溃转储
    Cache,        // 缓存文件
    Other         // 其他
}
```

### 4. 清理临时文件

**安全删除：**
```csharp
public class TempFileCleaner
{
    public async Task<CleanupResult> CleanAsync(string directory, 
        int? olderThanDays = null, 
        CancellationToken ct = default)
    {
        var result = new CleanupResult();
        
        var scanner = new TempFileScanner();
        var files = await scanner.ScanAsync(directory, ct);
        
        // 按时间过滤
        if (olderThanDays.HasValue)
        {
            var cutoffDate = DateTime.Now.AddDays(-olderThanDays.Value);
            files = files.Where(f => f.LastModified < cutoffDate).ToList();
        }
        
        foreach (var file in files)
        {
            ct.ThrowIfCancellationRequested();
            
            try
            {
                File.Delete(file.Path);
                result.DeletedCount++;
                result.DeletedSize += file.Size;
            }
            catch (IOException)
            {
                // 文件被占用
                result.SkippedCount++;
            }
            catch (UnauthorizedAccessException)
            {
                // 无权限
                result.SkippedCount++;
            }
        }
        
        return result;
    }
}

public class CleanupResult
{
    public int DeletedCount { get; set; }
    public long DeletedSize { get; set; }
    public int SkippedCount { get; set; }
    public string Error { get; set; }
    
    public string FormattedSize => FormatBytes(DeletedSize);
    
    private string FormatBytes(long bytes)
    {
        string[] sizes = { "B", "KB", "MB", "GB", "TB" };
        double len = bytes;
        int order = 0;
        while (len >= 1024 && order < sizes.Length - 1)
        {
            order++;
            len /= 1024;
        }
        return $"{len:0.##} {sizes[order]}";
    }
}
```

### 5. 特殊区域清理

**清理回收站：**
```csharp
using Microsoft.VisualBasic.FileIO;

public class RecycleBinCleaner
{
    public static void EmptyRecycleBin()
    {
        FileSystem.DeleteDirectory(
            @"C:\$Recycle.Bin",
            UIOption.OnlyErrorDialogs,
            RecycleOption.DeletePermanently);
    }
    
    // 或使用 SHEmptyRecycleBin API
    [DllImport("shell32.dll", CharSet = CharSet.Unicode)]
    private static extern int SHEmptyRecycleBin(
        IntPtr hwnd, 
        string pszRootPath, 
        RecycleBinFlags dwFlags);
    
    [Flags]
    private enum RecycleBinFlags : uint
    {
        NoConfirmation = 0x00000001,
        NoProgressUI = 0x00000002,
        NoSound = 0x00000004
    }
    
    public static int EmptyRecycleBinSilent()
    {
        return SHEmptyRecycleBin(
            IntPtr.Zero, 
            null, 
            RecycleBinFlags.NoConfirmation | RecycleBinFlags.NoProgressUI);
    }
}
```

**清理 DNS 缓存：**
```csharp
using System.Diagnostics;

public class DnsCleaner
{
    public static void FlushDnsCache()
    {
        var psi = new ProcessStartInfo
        {
            FileName = "ipconfig",
            Arguments = "/flushdns",
            UseShellExecute = false,
            RedirectStandardOutput = true,
            CreateNoWindow = true
        };
        
        using (var process = Process.Start(psi))
        {
            process.WaitForExit();
        }
    }
}
```

**清理 Windows 更新缓存：**
```csharp
public class WindowsUpdateCleaner
{
    public async Task<long> CleanDownloadCacheAsync()
    {
        long cleanedSize = 0;
        var downloadPath = @"C:\Windows\SoftwareDistribution\Download";
        
        if (!Directory.Exists(downloadPath))
            return cleanedSize;
        
        // 需要先停止 Windows Update 服务
        StopService("wuauserv");
        
        try
        {
            var files = Directory.GetFiles(downloadPath, "*", SearchOption.AllDirectories);
            foreach (var file in files)
            {
                try
                {
                    cleanedSize += new FileInfo(file).Length;
                    File.Delete(file);
                }
                catch { }
            }
        }
        finally
        {
            // 重新启动服务
            StartService("wuauserv");
        }
        
        return cleanedSize;
    }
    
    private void StopService(string serviceName)
    {
        var psi = new ProcessStartInfo
        {
            FileName = "net",
            Arguments = $"stop {serviceName}",
            UseShellExecute = false,
            Verb = "runas",  // 管理员权限
            CreateNoWindow = true
        };
        
        using (var process = Process.Start(psi))
        {
            process?.WaitForExit();
        }
    }
    
    private void StartService(string serviceName)
    {
        var psi = new ProcessStartInfo
        {
            FileName = "net",
            Arguments = $"start {serviceName}",
            UseShellExecute = false,
            Verb = "runas",
            CreateNoWindow = true
        };
        
        using (var process = Process.Start(psi))
        {
            process?.WaitForExit();
        }
    }
}
```

### 6. 一键清理流程

```
1. 扫描所有临时文件位置
   ├── %TEMP% 目录
   ├── Windows 更新缓存
   ├── 错误报告
   ├── 预读取文件
   ├── 缩略图缓存
   └── 回收站
   ↓
2. 计算可释放空间
   ↓
3. 生成清理报告
   ↓
4. 用户确认
   ↓
5. 执行清理
   ├── 停止相关服务（如需要）
   ├── 删除文件
   ├── 清空回收站
   └── 刷新 DNS
   ↓
6. 恢复服务
   ↓
7. 显示清理结果
```

---

## 安全策略

1. **时间过滤：** 默认只清理超过 N 天的文件，避免删除正在使用的临时文件
2. **系统文件保护：** 不删除系统关键目录下的文件
3. **进程占用检测：** 跳过被占用的文件
4. **操作日志：** 记录所有删除操作，支持恢复
