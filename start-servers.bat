@echo off
echo Starting Laravel + React CMS servers...
echo.

echo Starting Laravel API server...
start cmd /k "cd backend && php artisan serve"

timeout /t 2 /nobreak > nul

echo Starting React admin panel...
start cmd /k "cd admin && npm run dev"

echo.
echo Servers are starting...
echo Laravel API: http://localhost:8000
echo React Admin: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul