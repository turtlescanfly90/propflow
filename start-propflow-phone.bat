@echo off
cd /d "%~dp0"
echo.
echo PropFlow phone test server
echo --------------------------
echo Keep this window open while testing on your iPhone.
echo.
echo Your computer network addresses:
powershell -NoProfile -Command "Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.PrefixOrigin -ne 'WellKnown' } | ForEach-Object { 'http://' + $_.IPAddress + ':5173/' }"
echo.
echo On your iPhone, open one of the URLs above in Safari.
echo.
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  python -m http.server 5173 --bind 0.0.0.0
  exit /b
)
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  py -m http.server 5173 --bind 0.0.0.0
  exit /b
)
echo Python was not found. Start the app with start-propflow.bat on this computer first.
pause
