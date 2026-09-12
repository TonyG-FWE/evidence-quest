@echo off
setlocal
set "PATH=%~dp0..\.tools\node-v24.21.0-win-x64;%PATH%"
"%~dp0..\.tools\node-v24.21.0-win-x64\node.exe" "%~dp0..\.tools\node-v24.21.0-win-x64\node_modules\npm\bin\npm-cli.js" %*
exit /b %errorlevel%
