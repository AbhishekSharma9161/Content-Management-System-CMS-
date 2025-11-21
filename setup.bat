@echo off
echo Setting up Laravel + React CMS...
echo.

echo [1/6] Setting up Laravel backend...
cd backend
if not exist vendor (
    echo Installing Composer dependencies...
    composer install
)

if not exist .env (
    echo Creating environment file...
    copy .env.example .env
    php artisan key:generate
)

echo [2/6] Setting up database...
php artisan migrate --seed

echo [3/6] Creating storage link...
php artisan storage:link

echo [4/6] Setting up React admin panel...
cd ..\admin
if not exist node_modules (
    echo Installing NPM dependencies...
    npm install
)

echo [5/6] Setup complete!
echo.
echo To start the application:
echo 1. Backend: cd backend && php artisan serve
echo 2. Frontend: cd admin && npm run dev
echo.
echo Default login credentials:
echo Email: admin@example.com
echo Password: password
echo.
echo [6/6] Starting servers...
echo Starting Laravel server...
start cmd /k "cd backend && php artisan serve"

timeout /t 3 /nobreak > nul

echo Starting React development server...
start cmd /k "cd admin && npm run dev"

echo.
echo Setup complete! Both servers are starting...
echo Laravel API: http://localhost:8000
echo React Admin: http://localhost:3000
pause