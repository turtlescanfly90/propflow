@echo off
cd /d "%~dp0"
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  start "" http://127.0.0.1:5173/
  python -m http.server 5173 --bind 127.0.0.1
  exit /b
)
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  start "" http://127.0.0.1:5173/
  py -m http.server 5173 --bind 127.0.0.1
  exit /b
)
start "" "%~dp0index.html"
