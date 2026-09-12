$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskTools = Join-Path $taskRoot '.tools'
$taskRuntime = Join-Path $taskTools 'node-v24.21.0-win-x64'
$taskNode = Join-Path $taskRuntime 'node.exe'
if (Test-Path -LiteralPath $taskNode) {
  if ((& $taskNode --version) -ne 'v24.21.0') { throw 'Unexpected workspace runtime version.' }
  Write-Output 'Workspace Node 24.21.0 is ready.'
  return
}
if (Test-Path -LiteralPath $taskRuntime) { throw 'Incomplete runtime directory exists; preserve it and inspect before retrying.' }
New-Item -ItemType Directory -Force -Path $taskTools | Out-Null
$taskArchive = Join-Path $taskTools 'node-v24.21.0-win-x64.zip'
Invoke-WebRequest -Uri 'https://nodejs.org/dist/v24.21.0/node-v24.21.0-win-x64.zip' -OutFile $taskArchive
$taskExpected = '158f7685b44de51f6c0df1d153526cbcd3e1bc739a8dfc607721cef75de9e541'
if ((Get-FileHash -LiteralPath $taskArchive -Algorithm SHA256).Hash.ToLowerInvariant() -ne $taskExpected) { throw 'Node archive SHA-256 does not match the verified baseline.' }
Expand-Archive -LiteralPath $taskArchive -DestinationPath $taskTools
if ((& $taskNode --version) -ne 'v24.21.0') { throw 'Extracted runtime version does not match.' }
Write-Output 'Workspace Node 24.21.0 is ready. No global runtime was changed.'
