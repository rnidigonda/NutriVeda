@echo off
REM ========================================
REM NutriVeda Website - S3 Deployment Script
REM ========================================

echo.
echo ========================================
echo  NutriVeda Website - S3 Deployment
echo ========================================
echo.

REM Check if AWS CLI is installed
where aws >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] AWS CLI is not installed!
    echo.
    echo Please install AWS CLI first:
    echo https://aws.amazon.com/cli/
    echo.
    pause
    exit /b 1
)

echo [INFO] AWS CLI found!
echo.

REM Get bucket name from user
set /p BUCKET_NAME="Enter your S3 bucket name (e.g., nutriveda-website): "

if "%BUCKET_NAME%"=="" (
    echo [ERROR] Bucket name cannot be empty!
    pause
    exit /b 1
)

echo.
echo [INFO] Target bucket: %BUCKET_NAME%
echo.

REM Confirm before upload
set /p CONFIRM="Ready to upload files to S3? (y/n): "

if /i not "%CONFIRM%"=="y" (
    echo [INFO] Deployment cancelled.
    pause
    exit /b 0
)

echo.
echo [INFO] Starting upload...
echo.

REM Upload files to S3
aws s3 sync . s3://%BUCKET_NAME% ^
  --exclude ".git/*" ^
  --exclude ".vscode/*" ^
  --exclude "*.md" ^
  --exclude "*.zip" ^
  --exclude "docs/*" ^
  --exclude "scripts/*" ^
  --exclude "*.bat" ^
  --exclude "node_modules/*" ^
  --delete

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Upload failed!
    echo.
    echo Common issues:
    echo - AWS CLI not configured (run: aws configure)
    echo - Invalid bucket name
    echo - No permissions to upload
    echo.
    pause
    exit /b 1
)

echo.
echo [INFO] Files uploaded successfully!
echo.

REM Set correct content types
echo [INFO] Setting content types...
echo.

aws s3 cp s3://%BUCKET_NAME% s3://%BUCKET_NAME% --recursive ^
  --content-type "text/html" ^
  --exclude "*" ^
  --include "*.html" ^
  --metadata-directive REPLACE ^
  --quiet

aws s3 cp s3://%BUCKET_NAME% s3://%BUCKET_NAME% --recursive ^
  --content-type "text/css" ^
  --exclude "*" ^
  --include "*.css" ^
  --metadata-directive REPLACE ^
  --quiet

aws s3 cp s3://%BUCKET_NAME% s3://%BUCKET_NAME% --recursive ^
  --content-type "application/javascript" ^
  --exclude "*" ^
  --include "*.js" ^
  --metadata-directive REPLACE ^
  --quiet

echo [INFO] Content types set!
echo.

REM Get AWS region
for /f "tokens=*" %%i in ('aws configure get region') do set AWS_REGION=%%i

if "%AWS_REGION%"=="" set AWS_REGION=ap-south-1

echo ========================================
echo  DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your website URL:
echo http://%BUCKET_NAME%.s3-website.%AWS_REGION%.amazonaws.com
echo.
echo Next steps:
echo 1. Open the URL above to test your website
echo 2. Check all pages load correctly
echo 3. Test contact form
echo 4. Test shopping cart
echo.
echo To update: Run this script again
echo.

pause
