@echo off
chcp 65001 >nul
echo ========================================
echo   HireNUp Deployment Script
echo ========================================
echo.

REM Git init if needed
if not exist ".git" (
    echo [1/5] Git repository olusturuluyor...
    git init
    echo.
)

REM Add all files
echo [2/5] Tum dosyalar ekleniyor...
git add -A
echo.

REM Commit
echo [3/5] Commit yapiliyor...
git commit -m "HireNUp v1.0 - Dashboard pages fixed, all 404 errors resolved"
echo.

REM Check if remote exists
git remote -v | findstr "origin" >nul
if errorlevel 1 (
    echo [4/5] Remote bulunamadi!
    echo.
    echo GitHub repository URL'nizi girin:
    echo Ornek: https://github.com/USERNAME/hirenup.git
    set /p REPO_URL=URL: 
    git remote add origin %REPO_URL%
    echo Remote eklendi: %REPO_URL%
) else (
    echo [4/5] Remote mevcut.
)
echo.

REM Push
echo [5/5] GitHub'a push ediliyor...
git branch -M main
git push -u origin main
echo.

echo ========================================
echo   TAMAMLANDI!
echo ========================================
echo.
echo Simdi Vercel'e gidin:
echo 1. https://vercel.com/dashboard
echo 2. "Add New" ^> "Project"
echo 3. GitHub repo'nuzu secin
echo 4. Domain: www.hirenup.com
echo.
echo VEYA Railway:
echo 1. https://railway.app/dashboard
echo 2. "New Project" ^> "Deploy from GitHub"
echo 3. Domain ayarlayin
echo.
pause
