# NTFS 磁盘管理 - 实现原理

## 功能描述
管理 NTFS 文件系统，包括压缩卷、扩展卷、分区管理等磁盘操作。

---

## 核心原理

### 1. 磁盘信息获取

**使用 WMI 获取磁盘信息：**
```csharp
using System.Management;

public class DiskManager
{
    public List<DiskInfo> GetDisks()
    {
        var disks = new List<DiskInfo>();
        
        // 获取物理磁盘
        using (var searcher = new ManagementObjectSearcher(
            "SELECT * FROM Win32_DiskDrive"))
        {
            foreach (ManagementObject disk in searcher.Get())
            {
                disks.Add(new DiskInfo
                {
                    DeviceID = disk["DeviceID"]?.ToString(),
                    Model = disk["Model"]?.ToString(),
                    Size = Convert.ToUInt64(disk["Size"]),
                    Partitions = Convert.ToUInt32(disk["Partitions"]),
                    MediaType = disk["MediaType"]?.ToString()
                });
            }
        }
        
        return disks;
    }
    
    public List<VolumeInfo> GetVolumes()
    {
        var volumes = new List<VolumeInfo>();
        
        using (var searcher = new ManagementObjectSearcher(
            "SELECT * FROM Win32_LogicalDisk WHERE DriveType=3"))
        {
            foreach (ManagementObject vol in searcher.Get())
            {
                volumes.Add(new VolumeInfo
                {
                    DriveLetter = vol["DeviceID"]?.ToString(),
                    VolumeName = vol["VolumeName"]?.ToString(),
                    FileSystem = vol["FileSystem"]?.ToString(),
                    TotalSize = Convert.ToUInt64(vol["Size"]),
                    FreeSpace = Convert.ToUInt64(vol["FreeSpace"]),
                    UsedSpace = Convert.ToUInt64(vol["Size"]) - Convert.ToUInt64(vol["FreeSpace"])
                });
            }
        }
        
        return volumes;
    }
}

public class DiskInfo
{
    public string DeviceID { get; set; }
    public string Model { get; set; }
    public ulong Size { get; set; }
    public uint Partitions { get; set; }
    public string MediaType { get; set; }
}

public class VolumeInfo
{
    public string DriveLetter { get; set; }
    public string VolumeName { get; set; }
    public string FileSystem { get; set; }
    public ulong TotalSize { get; set; }
    public ulong FreeSpace { get; set; }
    public ulong UsedSpace { get; set; }
    public double UsedPercentage => TotalSize > 0 ? (double)UsedSpace / TotalSize * 100 : 0;
}
```

### 2. 压缩卷操作

**使用 DiskPart 命令：**
```csharp
public class VolumeShrinker
{
    public async Task<bool> ShrinkVolumeAsync(string driveLetter, ulong shrinkSizeMB)
    {
        // 创建 DiskPart 脚本
        var scriptPath = Path.GetTempFileName() + ".txt";
        var script = $@"
select volume {driveLetter.TrimEnd(':')}
shrink desired={shrinkSizeMB}
exit
";
        await File.WriteAllTextAsync(scriptPath, script);
        
        // 执行 DiskPart
        var psi = new ProcessStartInfo
        {
            FileName = "diskpart.exe",
            Arguments = $"/s \"{scriptPath}\"",
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            Verb = "runas",  // 需要管理员权限
            CreateNoWindow = true
        };
        
        try
        {
            using (var process = Process.Start(psi))
            {
                var output = await process.StandardOutput.ReadToEndAsync();
                var error = await process.StandardError.ReadToEndAsync();
                await process.WaitForExitAsync();
                
                return process.ExitCode == 0;
            }
        }
        finally
        {
            File.Delete(scriptPath);
        }
    }
    
    // 获取可压缩空间大小
    public async Task<ulong> GetShrinkableSizeAsync(string driveLetter)
    {
        var scriptPath = Path.GetTempFileName() + ".txt";
        var script = $@"
select volume {driveLetter.TrimEnd(':')}
shrink querymax
exit
";
        await File.WriteAllTextAsync(scriptPath, script);
        
        var psi = new ProcessStartInfo
        {
            FileName = "diskpart.exe",
            Arguments = $"/s \"{scriptPath}\"",
            UseShellExecute = false,
            RedirectStandardOutput = true,
            Verb = "runas",
            CreateNoWindow = true
        };
        
        try
        {
            using (var process = Process.Start(psi))
            {
                var output = await process.StandardOutput.ReadToEndAsync();
                await process.WaitForExitAsync();
                
                // 解析输出获取可压缩大小
                return ParseQueryMaxOutput(output);
            }
        }
        finally
        {
            File.Delete(scriptPath);
        }
    }
    
    private ulong ParseQueryMaxOutput(string output)
    {
        // 解析 "The maximum number of reclaimable bytes is: XXXX" 
        var match = Regex.Match(output, @"maximum.*?(\d+)\s+MB", RegexOptions.IgnoreCase);
        if (match.Success && ulong.TryParse(match.Groups[1].Value, out ulong size))
        {
            return size;
        }
        return 0;
    }
}
```

### 3. 扩展卷操作

```csharp
public class VolumeExtender
{
    public async Task<bool> ExtendVolumeAsync(string driveLetter, ulong extendSizeMB)
    {
        var scriptPath = Path.GetTempFileName() + ".txt";
        var script = $@"
select volume {driveLetter.TrimEnd(':')}
extend size={extendSizeMB}
exit
";
        await File.WriteAllTextAsync(scriptPath, script);
        
        var psi = new ProcessStartInfo
        {
            FileName = "diskpart.exe",
            Arguments = $"/s \"{scriptPath}\"",
            UseShellExecute = false,
            Verb = "runas",
            CreateNoWindow = true
        };
        
        try
        {
            using (var process = Process.Start(psi))
            {
                await process.WaitForExitAsync();
                return process.ExitCode == 0;
            }
        }
        finally
        {
            File.Delete(scriptPath);
        }
    }
}
```

### 4. 使用 WMI 进行磁盘管理

**更高级的磁盘操作：**
```csharp
public class WmiDiskManager
{
    public bool ShrinkVolumeWmi(string driveLetter, ulong shrinkSizeMB)
    {
        var scope = new ManagementScope(@"\\.\ROOT\CIMV2");
        scope.Connect();
        
        // 获取卷对象
        var path = new ManagementPath($"Win32_Volume.DeviceID=\"{driveLetter}\\\"");
        using (var volume = new ManagementObject(scope, path, null))
        {
            // 调用 DefragAnalysis 获取可压缩空间
            var outParams = volume.InvokeMethod("DefragAnalysis", null, null);
            
            // 执行压缩操作
            var inParams = volume.GetMethodParameters("Shrink");
            inParams["NumberOfBytes"] = shrinkSizeMB * 1024 * 1024;
            
            var result = volume.InvokeMethod("Shrink", inParams, null);
            return (uint)result["ReturnValue"] == 0;
        }
    }
}
```

### 5. 分区信息

```csharp
public class PartitionManager
{
    public List<PartitionInfo> GetPartitions()
    {
        var partitions = new List<PartitionInfo>();
        
        using (var searcher = new ManagementObjectSearcher(
            "SELECT * FROM Win32_DiskPartition"))
        {
            foreach (ManagementObject partition in searcher.Get())
            {
                partitions.Add(new PartitionInfo
                {
                    Name = partition["Name"]?.ToString(),
                    Size = Convert.ToUInt64(partition["Size"]),
                    Type = partition["Type"]?.ToString(),
                    Bootable = Convert.ToBoolean(partition["Bootable"]),
                    DiskIndex = Convert.ToUInt32(partition["DiskIndex"])
                });
            }
        }
        
        return partitions;
    }
    
    // 创建新分区
    public bool CreatePartition(string diskID, ulong sizeMB)
    {
        var scriptPath = Path.GetTempFileName() + ".txt";
        var script = $@"
select disk {diskID}
create partition primary size={sizeMB}
format fs=ntfs quick
assign
exit
";
        File.WriteAllText(scriptPath, script);
        
        var psi = new ProcessStartInfo
        {
            FileName = "diskpart.exe",
            Arguments = $"/s \"{scriptPath}\"",
            UseShellExecute = false,
            Verb = "runas",
            CreateNoWindow = true
        };
        
        try
        {
            using (var process = Process.Start(psi))
            {
                process.WaitForExit();
                return process.ExitCode == 0;
            }
        }
        finally
        {
            File.Delete(scriptPath);
        }
    }
}

public class PartitionInfo
{
    public string Name { get; set; }
    public ulong Size { get; set; }
    public string Type { get; set; }
    public bool Bootable { get; set; }
    public uint DiskIndex { get; set; }
}
```

### 6. 磁盘健康检查

```csharp
public class DiskHealthChecker
{
    public DiskHealthStatus CheckHealth(string driveLetter)
    {
        var status = new DiskHealthStatus { DriveLetter = driveLetter };
        
        using (var searcher = new ManagementObjectSearcher(
            $"SELECT * FROM Win32_LogicalDisk WHERE DeviceID='{driveLetter}'"))
        {
            foreach (ManagementObject disk in searcher.Get())
            {
                status.TotalSize = Convert.ToUInt64(disk["Size"]);
                status.FreeSpace = Convert.ToUInt64(disk["FreeSpace"]);
                status.FileSystem = disk["FileSystem"]?.ToString();
            }
        }
        
        // 评估健康状态
        if (status.TotalSize > 0)
        {
            var usagePercent = (double)(status.TotalSize - status.FreeSpace) / status.TotalSize * 100;
            
            if (usagePercent < 70)
                status.Health = "良好";
            else if (usagePercent < 90)
                status.Health = "警告";
            else
                status.Health = "危险";
        }
        
        return status;
    }
}

public class DiskHealthStatus
{
    public string DriveLetter { get; set; }
    public ulong TotalSize { get; set; }
    public ulong FreeSpace { get; set; }
    public string FileSystem { get; set; }
    public string Health { get; set; }
}
```

---

## 操作流程

### 压缩卷流程
```
1. 检查磁盘是否有足够可压缩空间
   ↓
2. 提示用户输入压缩大小
   ↓
3. 确认操作（警告：操作有风险）
   ↓
4. 执行压缩
   ↓
5. 显示压缩后未分配空间
```

### 扩展卷流程
```
1. 检查目标卷相邻是否有未分配空间
   ↓
2. 提示用户输入扩展大小
   ↓
3. 确认操作
   ↓
4. 执行扩展
   ↓
5. 显示扩展后容量
```

---

## 安全注意事项

1. **管理员权限：** 所有磁盘操作都需要管理员权限
2. **数据备份提醒：** 操作前提醒用户备份重要数据
3. **操作确认：** 高风险操作需要二次确认
4. **系统盘保护：** 对系统盘（C 盘）操作额外警告
5. **错误回滚：** 操作失败时尝试恢复
