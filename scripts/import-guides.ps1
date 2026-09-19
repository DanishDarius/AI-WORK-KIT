param(
  [Parameter(Mandatory = $true)]
  [string]$ArchivePath
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$destination = Join-Path $projectRoot "content\guides"

New-Item -ItemType Directory -Force -Path $destination | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($ArchivePath)

try {
  $existingBySource = @{}
  foreach ($file in Get-ChildItem -LiteralPath $destination -Filter "guide-*.md") {
    $content = Get-Content -LiteralPath $file.FullName -Raw
    $sourceMatch = [regex]::Match($content, "(?mi)^Source\s*:\s*(.+)$")
    if ($sourceMatch.Success) {
      $source = $sourceMatch.Groups[1].Value.Trim().TrimEnd(".")
      $existingBySource[$source] = $file.FullName
    }
  }

  foreach ($entry in $archive.Entries) {
    if (-not $entry.Name.EndsWith(".md", [System.StringComparison]::OrdinalIgnoreCase)) {
      continue
    }

    $sourceStream = $entry.Open()
    try {
      $reader = [System.IO.StreamReader]::new($sourceStream)
      $content = $reader.ReadToEnd()
      $sourceMatch = [regex]::Match($content, "(?mi)^Source\s*:\s*(.+)$")
      $source = if ($sourceMatch.Success) { $sourceMatch.Groups[1].Value.Trim().TrimEnd(".") } else { "" }
      $target = if ($source -and $existingBySource.ContainsKey($source)) {
        $existingBySource[$source]
      }
      else {
        Join-Path $destination $entry.Name
      }
      [System.IO.File]::WriteAllText($target, $content, [System.Text.UTF8Encoding]::new($false))
      if ($source) { $existingBySource[$source] = $target }
    }
    finally {
      $sourceStream.Dispose()
    }
  }
}
finally {
  $archive.Dispose()
}

$guideCount = @(Get-ChildItem -LiteralPath $destination -Filter "guide-*.md").Count
Write-Output "Imported $guideCount guides into $destination"
