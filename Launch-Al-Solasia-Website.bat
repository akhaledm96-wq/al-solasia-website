@echo off
title Al-Solasia Building Engineering — Real Official Website
cd /d "%~dp0"

echo ===================================================================
echo    الثلاثية لهندسة البناء | Al-Solasia Building Engineering
echo    Official Production Multi-Page Website Launcher
echo ===================================================================
echo.

:: Check if server is running
powershell -Command "$r = try { (Invoke-WebRequest -Uri 'http://localhost:3000/ar' -UseBasicParsing -TimeoutSec 2).StatusCode } catch { 0 }; if ($r -eq 200) { exit 0 } else { exit 1 }" >nul 2>&1

if %ERRORLEVEL% equ 0 (
    echo [OK] Al-Solasia official server is running!
    echo Opening official site at http://localhost:3000/ar ...
    start http://localhost:3000/ar
    exit /b 0
)

echo Starting Al-Solasia Multi-Page Production Server...
start "Al-Solasia Server" cmd /k "npx next start -p 3000"

echo Waiting for server to initialize...
timeout /t 3 /nobreak >nul

echo Opening official website at http://localhost:3000/ar ...
start http://localhost:3000/ar
exit /b 0
