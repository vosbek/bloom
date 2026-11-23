# Blume Desktop — rebuild and run, fully self-contained.
# Payload: this repo (desktop/app + desktop/plugin-bundle).
# Runtime: stock Electron 43.1.1, downloaded with checksum verification.
# Result:  <target>\blume.exe running the app entirely from this repo.
#
# Usage:   powershell -ExecutionPolicy Bypass -File build-and-run.ps1 [-Target C:\path] [-SkipDownload]
param(
  [string]$Target = "$PSScriptRoot\..\runtime",
  [switch]$SkipDownload
)
$ErrorActionPreference = 'Stop'
$electronVersion = '43.1.1'
$zip = "electron-v$electronVersion-win32-x64.zip"
$release = "https://github.com/electron/electron/releases/download/v$electronVersion"

$Target = [System.IO.Path]::GetFullPath($Target)
New-Item -ItemType Directory -Force -Path "$Target\resources" | Out-Null

if (-not $SkipDownload -and -not (Test-Path "$PSScriptRoot\$zip")) {
  Write-Host "downloading stock Electron $electronVersion..."
  Invoke-WebRequest -Uri "$release/$zip" -OutFile "$PSScriptRoot\$zip" -UseBasicParsing
  Invoke-WebRequest -Uri "$release/SHASUMS256.txt" -OutFile "$PSScriptRoot\SHASUMS256.txt" -UseBasicParsing
  $sum = (Get-FileHash "$PSScriptRoot\$zip" -Algorithm SHA256).Hash.ToLower()
  $want = (Get-Content "$PSScriptRoot\SHASUMS256.txt" | Where-Object { $_ -match [regex]::Escape($zip) }).Split(' ')[0].ToLower()
  if ($sum -ne $want) { throw "Electron zip checksum mismatch: $sum" }
  Write-Host "checksum ok: $sum"
}

Write-Host "assembling $Target..."
if (-not (Test-Path "$Target\resources\app\out\main\index.js")) {
  # fresh assembly: extract the runtime shell, then lay the payload over it
  Expand-Archive -Path "$PSScriptRoot\$zip" -DestinationPath $Target -Force
  Remove-Item "$Target\resources\app" -Recurse -Force -ErrorAction SilentlyContinue
  Remove-Item "$Target\resources\default_app.asar" -Force -ErrorAction SilentlyContinue
}
Copy-Item "$PSScriptRoot\app\*" "$Target\resources\app\" -Recurse -Force
Copy-Item "$PSScriptRoot\plugin-bundle" "$Target\resources\plugin-bundle" -Recurse -Force
Copy-Item "$PSScriptRoot\app-update.yml" "$Target\resources\app-update.yml" -Force
Rename-Item "$Target\electron.exe" "blume.exe" -Force -ErrorAction SilentlyContinue

Write-Host "launching $Target\blume.exe"
& "$Target\blume.exe" @args
