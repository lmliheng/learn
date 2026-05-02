# 浏览器痕迹清理 - 实现原理

## 功能描述
清理 Edge、Chrome 等浏览器的历史记录、缓存、Cookie、下载记录等使用痕迹。

---

## 核心原理

### 1. 浏览器数据路径

**Chrome 数据路径：**
```csharp
public static class ChromePaths
{
    public static string UserDataPath => 
        Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            @"Google\Chrome\User Data");
    
    public static string DefaultProfilePath => 
        Path.Combine(UserDataPath, "Default");
    
    // 各类数据文件
    public static string HistoryDb => Path.Combine(DefaultProfilePath, "History");
    public static string CookiesDb => Path.Combine(DefaultProfilePath, "Cookies");
    public static string CachePath => Path.Combine(DefaultProfilePath, "Cache");
    public static string CodeCachePath => Path.Combine(DefaultProfilePath, "Code Cache");
    public static string DownloadDb => Path.Combine(DefaultProfilePath, "History");
}
```

**Edge 数据路径：**
```csharp
public static class EdgePaths
{
    public static string UserDataPath => 
        Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            @"Microsoft\Edge\User Data");
    
    public static string DefaultProfilePath => 
        Path.Combine(UserDataPath, "Default");
    
    public static string HistoryDb => Path.Combine(DefaultProfilePath, "History");
    public static string CookiesDb => Path.Combine(DefaultProfilePath, "Cookies");
    public static string CachePath => Path.Combine(DefaultProfilePath, "Cache");
}
```

### 2. SQLite 数据库操作

浏览器历史记录、Cookie 等数据存储在 SQLite 数据库中。

**读取浏览历史：**
```csharp
using System.Data.SQLite;

public class BrowserHistoryReader
{
    public List<HistoryItem> ReadHistory(string dbPath)
    {
        var history = new List<HistoryItem>();
        
        // 先复制数据库文件（避免文件被占用）
        var tempDb = CopyDatabase(dbPath);
        
        using (var connection = new SQLiteConnection($"Data Source={tempDb}"))
        {
            connection.Open();
            
            var command = new SQLiteCommand(
                "SELECT url, title, last_visit_time, visit_count FROM urls ORDER BY last_visit_time DESC",
                connection);
            
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    history.Add(new HistoryItem
                    {
                        Url = reader.GetString(0),
                        Title = reader.GetString(1),
                        LastVisitTime = ChromeTimeToDateTime(reader.GetInt64(2)),
                        VisitCount = reader.GetInt32(3)
                    });
                }
            }
        }
        
        File.Delete(tempDb);
        return history;
    }
    
    // Chrome 时间戳转换（从 1601 年开始的微秒数）
    private DateTime ChromeTimeToDateTime(long chromeTime)
    {
        var epoch = new DateTime(1601, 1, 1);
        return epoch.AddTicks(chromeTime / 10);
    }
    
    private string CopyDatabase(string source)
    {
        var temp = Path.GetTempFileName();
        File.Copy(source, temp, true);
        return temp;
    }
}

public class HistoryItem
{
    public string Url { get; set; }
    public string Title { get; set; }
    public DateTime LastVisitTime { get; set; }
    public int VisitCount { get; set; }
}
```

**清理浏览历史：**
```csharp
public class BrowserHistoryCleaner
{
    public CleanupResult ClearHistory(string dbPath)
    {
        var result = new CleanupResult();
        var tempDb = CopyDatabase(dbPath);
        
        try
        {
            using (var connection = new SQLiteConnection($"Data Source={tempDb}"))
            {
                connection.Open();
                
                using (var transaction = connection.BeginTransaction())
                {
                    // 删除历史记录
                    var cmd = new SQLiteCommand("DELETE FROM urls", connection);
                    result.HistoryCount = cmd.ExecuteNonQuery();
                    
                    // 删除下载记录
                    cmd = new SQLiteCommand("DELETE FROM downloads", connection);
                    result.DownloadCount = cmd.ExecuteNonQuery();
                    
                    // 删除表单数据
                    cmd = new SQLiteCommand("DELETE FROM autofill", connection);
                    result.AutofillCount = cmd.ExecuteNonQuery();
                    
                    transaction.Commit();
                }
            }
            
            // 替换原数据库
            KillBrowserProcess();
            File.Copy(tempDb, dbPath, true);
            result.Success = true;
        }
        catch (Exception ex)
        {
            result.Success = false;
            result.Error = ex.Message;
        }
        finally
        {
            File.Delete(tempDb);
        }
        
        return result;
    }
}
```

### 3. 缓存文件清理

**清理浏览器缓存目录：**
```csharp
public class BrowserCacheCleaner
{
    public async Task<CleanupStats> CleanCacheAsync(string browserName)
    {
        var stats = new CleanupStats();
        string cachePath = browserName.ToLower() switch
        {
            "chrome" => ChromePaths.CachePath,
            "edge" => EdgePaths.CachePath,
            _ => throw new ArgumentException("Unknown browser")
        };
        
        if (!Directory.Exists(cachePath))
            return stats;
        
        var files = Directory.GetFiles(cachePath, "*", SearchOption.AllDirectories);
        
        foreach (var file in files)
        {
            try
            {
                var fileInfo = new FileInfo(file);
                stats.TotalSize += fileInfo.Length;
                stats.FileCount++;
                
                File.Delete(file);
            }
            catch
            {
                // 文件被占用，跳过
                stats.SkippedCount++;
            }
        }
        
        return stats;
    }
}
```

### 4. 检测浏览器运行状态

```csharp
using System.Diagnostics;

public class BrowserProcessManager
{
    public static bool IsRunning(string browserName)
    {
        var processNames = browserName.ToLower() switch
        {
            "chrome" => new[] { "chrome", "chrome_helper" },
            "edge" => new[] { "msedge", "msedge_helper" },
            _ => Array.Empty<string>()
        };
        
        var processes = Process.GetProcesses();
        return processes.Any(p => 
            processNames.Any(name => 
                p.ProcessName.Contains(name, StringComparison.OrdinalIgnoreCase)));
    }
    
    public static void CloseBrowser(string browserName)
    {
        var processNames = browserName.ToLower() switch
        {
            "chrome" => "chrome",
            "edge" => "msedge",
            _ => null
        };
        
        if (processNames == null) return;
        
        var processes = Process.GetProcessesByName(processNames);
        foreach (var process in processes)
        {
            process.CloseMainWindow();  // 优雅关闭
        }
    }
}
```

### 5. 多浏览器支持架构

**浏览器清理接口：**
```csharp
public interface IBrowserCleaner
{
    string BrowserName { get; }
    Task<CleanupReport> AnalyzeAsync();
    Task<CleanupReport> CleanAsync(CleanupOptions options);
}

// Chrome 清理器
public class ChromeCleaner : IBrowserCleaner
{
    public string BrowserName => "Chrome";
    
    public async Task<CleanupReport> AnalyzeAsync()
    {
        return new CleanupReport
        {
            BrowserName = BrowserName,
            HistorySize = await GetHistorySizeAsync(),
            CacheSize = await GetCacheSizeAsync(),
            CookieSize = await GetCookieSizeAsync(),
            DownloadHistoryCount = await GetDownloadCountAsync()
        };
    }
    
    public async Task<CleanupReport> CleanAsync(CleanupOptions options)
    {
        var report = new CleanupReport();
        
        if (options.ClearHistory)
            report.HistorySize = await ClearHistoryAsync();
            
        if (options.ClearCache)
            report.CacheSize = await ClearCacheAsync();
            
        if (options.ClearCookies)
            report.CookieSize = await ClearCookiesAsync();
            
        if (options.ClearDownloads)
            report.DownloadHistoryCount = await ClearDownloadHistoryAsync();
        
        return report;
    }
}

// Edge 清理器
public class EdgeCleaner : IBrowserCleaner
{
    public string BrowserName => "Edge";
    // 实现类似 Chrome...
}

// 浏览器清理工厂
public class BrowserCleanerFactory
{
    private static readonly Dictionary<string, IBrowserCleaner> _cleaners = new()
    {
        { "Chrome", new ChromeCleaner() },
        { "Edge", new EdgeCleaner() }
    };
    
    public static IBrowserCleaner GetCleaner(string browserName)
    {
        return _cleaners.TryGetValue(browserName, out var cleaner) 
            ? cleaner 
            : throw new KeyNotFoundException($"Browser '{browserName}' not supported");
    }
}
```

### 6. 清理选项

```csharp
public class CleanupOptions
{
    public bool ClearHistory { get; set; }      // 清除浏览历史
    public bool ClearCache { get; set; }        // 清除缓存
    public bool ClearCookies { get; set; }      // 清除 Cookie
    public bool ClearDownloads { get; set; }    // 清除下载记录
    public bool ClearPasswords { get; set; }    // 清除保存的密码
    public bool ClearFormData { get; set; }     // 清除表单数据
    public DateTime? ClearBefore { get; set; }  // 仅清除指定时间之前的数据
}
```

---

## 清理流程

```
1. 检测已安装的浏览器
   ↓
2. 检查浏览器是否正在运行
   ↓
3. 提示用户关闭浏览器
   ↓
4. 扫描各浏览器数据大小
   ↓
5. 生成清理报告
   ↓
6. 用户选择清理项
   ↓
7. 关闭浏览器进程
   ↓
8. 执行清理
   ↓
9. 显示清理结果
```

---

## 注意事项

1. **数据库锁问题：** 浏览器运行时数据库文件被锁定，需先关闭浏览器
2. **备份机制：** 清理前自动备份数据库文件
3. **时间转换：** Chrome/Edge 使用特殊的 timestamp 格式（从 1601 年开始）
4. **多配置文件：** 支持多用户配置文件的清理
