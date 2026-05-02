# 开机启动项管理 - 实现原理

## 功能描述
管理系统开机启动项，包括启用/禁用/删除启动项，支持注册表启动项和任务计划程序。

---

## 核心原理

### 1. 启动项存储位置

Windows 启动项分布在多个位置：

```
注册表启动项：
├── HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run          # 全局启动项
├── HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce      # 一次性启动项
├── HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run          # 当前用户启动项
├── HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce      # 当前用户一次性启动项
├── HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run  # 32位程序启动项
└── HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnceEx    # 扩展一次性启动项

启动文件夹：
├── C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup      # 全局启动文件夹
└── C:\Users\{用户}\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup  # 用户启动文件夹

任务计划程序：
└── Microsoft\Windows\TaskScheduler 下的各种定时任务
```

### 2. 注册表启动项管理

**读取启动项：**
```csharp
using Microsoft.Win32;

public class RegistryStartupManager
{
    private static readonly string[] RunKeys = new[]
    {
        @"SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
        @"SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce",
        @"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run"
    };
    
    public List<StartupItem> GetStartupItems()
    {
        var items = new List<StartupItem>();
        
        // 读取 HKLM（全局）
        foreach (var keyPath in RunKeys)
        {
            items.AddRange(ReadRegistryKey(Registry.LocalMachine, keyPath, "全局"));
        }
        
        // 读取 HKCU（当前用户）
        foreach (var keyPath in RunKeys)
        {
            items.AddRange(ReadRegistryKey(Registry.CurrentUser, keyPath, "用户"));
        }
        
        return items;
    }
    
    private List<StartupItem> ReadRegistryKey(RegistryKey rootKey, string subKey, string scope)
    {
        var items = new List<StartupItem>();
        
        try
        {
            using (var key = rootKey.OpenSubKey(subKey, false))
            {
                if (key == null) return items;
                
                foreach (var valueName in key.GetValueNames())
                {
                    var value = key.GetValue(valueName)?.ToString();
                    if (!string.IsNullOrEmpty(value))
                    {
                        items.Add(new StartupItem
                        {
                            Name = valueName,
                            Path = ExtractFilePath(value),
                            Arguments = ExtractArguments(value),
                            Location = $"{rootKey.Name}\\{subKey}",
                            Scope = scope,
                            Type = StartupType.Registry,
                            Enabled = true
                        });
                    }
                }
            }
        }
        catch (Exception ex)
        {
            // 记录错误
        }
        
        return items;
    }
    
    private string ExtractFilePath(string value)
    {
        // 去除引号并提取可执行文件路径
        var path = value.Trim('"');
        var spaceIndex = path.IndexOf(".exe", StringComparison.OrdinalIgnoreCase);
        if (spaceIndex > 0)
        {
            return path.Substring(0, spaceIndex + 4);
        }
        return path.Split(' ')[0];
    }
    
    private string ExtractArguments(string value)
    {
        var path = ExtractFilePath(value);
        return value.Substring(path.Length).Trim();
    }
}
```

**禁用启动项：**
```csharp
public class RegistryStartupManager
{
    // 方法1：直接删除
    public bool RemoveStartupItem(RegistryKey rootKey, string subKey, string valueName)
    {
        try
        {
            using (var key = rootKey.OpenSubKey(subKey, true))
            {
                if (key == null) return false;
                key.DeleteValue(valueName, false);
                return true;
            }
        }
        catch
        {
            return false;
        }
    }
    
    // 方法2：添加禁用标记（推荐，可恢复）
    public bool DisableStartupItem(RegistryKey rootKey, string subKey, string valueName)
    {
        try
        {
            using (var key = rootKey.OpenSubKey(subKey, true))
            {
                if (key == null) return false;
                
                var value = key.GetValue(valueName);
                if (value == null) return false;
                
                // 备份原值到 Run 键
                var disabledKey = subKey + "\\Disabled";
                using (var disabledSubKey = rootKey.CreateSubKey(disabledKey))
                {
                    disabledSubKey.SetValue(valueName, value);
                }
                
                // 删除原值
                key.DeleteValue(valueName);
                return true;
            }
        }
        catch
        {
            return false;
        }
    }
    
    // 恢复启动项
    public bool EnableStartupItem(RegistryKey rootKey, string subKey, string valueName)
    {
        try
        {
            var disabledKey = subKey + "\\Disabled";
            using (var disabledSubKey = rootKey.OpenSubKey(disabledKey, true))
            {
                if (disabledSubKey == null) return false;
                
                var value = disabledSubKey.GetValue(valueName);
                if (value == null) return false;
                
                // 恢复到 Run 键
                using (var runKey = rootKey.OpenSubKey(subKey, true))
                {
                    runKey.SetValue(valueName, value);
                }
                
                // 删除备份
                disabledSubKey.DeleteValue(valueName);
                return true;
            }
        }
        catch
        {
            return false;
        }
    }
}
```

### 3. 启动文件夹管理

**读取启动文件夹：**
```csharp
public class StartupFolderManager
{
    // 获取启动文件夹路径
    public static string GetCommonStartupFolder()
    {
        return Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.CommonPrograms),
            "Startup");
    }
    
    public static string GetUserStartupFolder()
    {
        return Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.Startup));
    }
    
    // 读取启动文件夹中的快捷方式
    public List<StartupItem> GetStartupFolderItems()
    {
        var items = new List<StartupItem>();
        var folders = new[] { GetCommonStartupFolder(), GetUserStartupFolder() };
        
        foreach (var folder in folders)
        {
            if (!Directory.Exists(folder)) continue;
            
            foreach (var file in Directory.GetFiles(folder, "*.lnk"))
            {
                var shortcut = ReadShortcut(file);
                items.Add(new StartupItem
                {
                    Name = Path.GetFileNameWithoutExtension(file),
                    Path = shortcut.TargetPath,
                    Arguments = shortcut.Arguments,
                    Location = folder,
                    Scope = folder == GetCommonStartupFolder() ? "全局" : "用户",
                    Type = StartupType.StartupFolder,
                    Enabled = true
                });
            }
        }
        
        return items;
    }
    
    private ShortcutInfo ReadShortcut(string shortcutPath)
    {
        // 使用 Windows Script Host 读取快捷方式
        Type t = Type.GetTypeFromProgID("WScript.Shell");
        dynamic shell = Activator.CreateInstance(t);
        dynamic shortcut = shell.CreateShortcut(shortcutPath);
        
        return new ShortcutInfo
        {
            TargetPath = shortcut.TargetPath,
            Arguments = shortcut.Arguments,
            WorkingDirectory = shortcut.WorkingDirectory,
            Description = shortcut.Description
        };
    }
}

public class ShortcutInfo
{
    public string TargetPath { get; set; }
    public string Arguments { get; set; }
    public string WorkingDirectory { get; set; }
    public string Description { get; set; }
}
```

### 4. 任务计划程序集成

**使用 TaskScheduler 库：**
```csharp
using TaskScheduler = Microsoft.Win32.TaskScheduler;

public class TaskSchedulerManager
{
    public List<StartupItem> GetScheduledTasks()
    {
        var items = new List<StartupItem>();
        
        using (var taskService = new TaskScheduler.TaskService())
        {
            // 获取所有任务
            foreach (var task in taskService.AllTasks)
            {
                // 筛选启动时运行的任务
                if (IsStartupTask(task))
                {
                    items.Add(new StartupItem
                    {
                        Name = task.Name,
                        Path = GetTaskActionPath(task),
                        Location = "任务计划程序",
                        Scope = "系统",
                        Type = StartupType.ScheduledTask,
                        Enabled = task.Enabled
                    });
                }
            }
        }
        
        return items;
    }
    
    private bool IsStartupTask(TaskScheduler.Task task)
    {
        // 检查触发器是否包含启动触发器
        return task.Definition.Triggers.Any(t => t is TaskScheduler.BootTrigger);
    }
    
    private string GetTaskActionPath(TaskScheduler.Task task)
    {
        foreach (var action in task.Definition.Actions)
        {
            if (action is TaskScheduler.ExecAction execAction)
            {
                return execAction.Path;
            }
        }
        return string.Empty;
    }
    
    // 禁用任务
    public bool DisableTask(string taskName)
    {
        using (var taskService = new TaskScheduler.TaskService())
        {
            var task = taskService.GetTask(taskName);
            if (task == null) return false;
            
            task.Enabled = false;
            task.RegisterChanges();
            return true;
        }
    }
}
```

### 5. 启动项数据模型

```csharp
public class StartupItem
{
    public string Name { get; set; }              // 名称
    public string Path { get; set; }              // 可执行文件路径
    public string Arguments { get; set; }         // 启动参数
    public string Location { get; set; }          // 存储位置
    public string Scope { get; set; }             // 作用域（全局/用户）
    public StartupType Type { get; set; }         // 类型
    public bool Enabled { get; set; }             // 是否启用
    public string Publisher { get; set; }         // 发布者
    public string Version { get; set; }           // 版本
    public string Description { get; set; }       // 描述
    
    // 计算属性
    public bool IsSystemFile => IsSystemPath(Path);
    public bool FileExists => File.Exists(Path);
    
    private bool IsSystemPath(string path)
    {
        var systemPaths = new[]
        {
            Environment.GetFolderPath(Environment.SpecialFolder.Windows),
            Environment.GetFolderPath(Environment.SpecialFolder.System)
        };
        
        return systemPaths.Any(sp => 
            path.StartsWith(sp, StringComparison.OrdinalIgnoreCase));
    }
}

public enum StartupType
{
    Registry,        // 注册表
    StartupFolder,   // 启动文件夹
    ScheduledTask    // 任务计划
}
```

### 6. 获取启动影响评估

```csharp
using System.Diagnostics;

public class StartupImpactAnalyzer
{
    public StartupImpact GetImpact(string executablePath)
    {
        var impact = new StartupImpact();
        
        try
        {
            var file = new FileInfo(executablePath);
            impact.FileSize = file.Length;
            impact.LastModified = file.LastWriteTime;
            
            // 获取文件版本信息
            var versionInfo = FileVersionInfo.GetVersionInfo(executablePath);
            impact.Publisher = versionInfo.CompanyName;
            impact.Description = versionInfo.FileDescription;
            
            // 检查是否为已知启动项
            impact.IsKnown = KnownStartupItems.Contains(
                Path.GetFileName(executablePath).ToLower());
        }
        catch
        {
            // 忽略错误
        }
        
        return impact;
    }
    
    // 已知启动项数据库
    private static readonly HashSet<string> KnownStartupItems = new HashSet<string>
    {
        "wechat.exe", "qq.exe", "dingtalk.exe",
        "onedrive.exe", "dropbox.exe",
        "steam.exe", "epicgameslauncher.exe",
        // ... 更多
    };
}
```

---

## 启动项管理流程

```
1. 扫描所有启动项来源
   ├── 注册表 Run/RunOnce 键
   ├── 启动文件夹快捷方式
   └── 任务计划程序
   ↓
2. 合并去重
   ↓
3. 获取每个启动项的详细信息
   ├── 文件路径验证
   ├── 发布者信息
   ├── 启动影响评估
   ↓
4. 展示给用户
   ↓
5. 用户操作（启用/禁用/删除）
   ↓
6. 执行操作并记录日志
```

---

## 安全注意事项

1. **系统启动项保护：** 不要禁用系统关键启动项
2. **操作前提示：** 禁用前提示用户该启动项的作用
3. **撤销功能：** 提供恢复功能，避免误操作
4. **权限要求：** 修改 HKLM 需要管理员权限
