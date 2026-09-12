$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskNodeDir = Join-Path $taskRoot '.tools/node-v24.21.0-win-x64'
if (-not (Test-Path -LiteralPath (Join-Path $taskNodeDir 'node.exe'))) {
  throw 'Use Node 24.21.0 (see .node-version), or restore the workspace-local runtime described in README.md.'
}
$env:PATH = $taskNodeDir + [IO.Path]::PathSeparator + $env:PATH
& (Join-Path $taskNodeDir 'node.exe') (Join-Path $taskNodeDir 'node_modules/npm/bin/npm-cli.js') @args
exit $LASTEXITCODE
