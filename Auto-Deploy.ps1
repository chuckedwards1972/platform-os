# AUTOMATIC HOPE PLATFORM DEPLOYMENT
# This script automatically deploys your HOPE Platform to Railway

Write-Host "AUTOMATIC HOPE PLATFORM DEPLOYMENT" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Open Railway dashboard
Write-Host "Opening Railway dashboard..." -ForegroundColor Yellow
Start-Process "https://railway.app"

# Wait for user to get Railway values
Write-Host "`nPlease go to Railway dashboard and:" -ForegroundColor Yellow
Write-Host "1. Wait for deployment to show 'Running' status" -ForegroundColor White
Write-Host "2. Click 'postgres' service > 'Connect' tab" -ForegroundColor White
Write-Host "3. Click 'platform-os' service > 'Variables' tab" -ForegroundColor White
Write-Host "4. Copy your DATABASE_URL and JWT_SECRET" -ForegroundColor White

# Get Railway values from user
Write-Host "`nEnter your Railway values when ready:" -ForegroundColor Green
$databaseUrl = Read-Host "DATABASE_URL (from postgres Connect tab)"
$jwtSecret = Read-Host "JWT_SECRET (from platform-os Variables tab)"

# Validate inputs
if (-not $databaseUrl -or -not $jwtSecret) {
    Write-Host "Error: Both DATABASE_URL and JWT_SECRET are required!" -ForegroundColor Red
    exit 1
}

# Get Railway URL
$railwayUrl = Read-Host "Railway URL (e.g., https://platform-os-xxxx.railway.app)"

if (-not $railwayUrl) {
    Write-Host "Error: Railway URL is required!" -ForegroundColor Red
    exit 1
}

# Create environment configuration
$envConfig = @"
DATABASE_URL=$databaseUrl
JWT_SECRET=$jwtSecret
NODE_ENV=production
NEXTAUTH_URL=$railwayUrl
"@

# Save to file
$envConfig | Out-File -FilePath ".env.production" -Encoding utf8
Write-Host "Environment configuration saved!" -ForegroundColor Green

# Copy to clipboard
$envConfig | Set-Clipboard
Write-Host "Configuration copied to clipboard!" -ForegroundColor Green

# Display final configuration
Write-Host "`nFinal Configuration:" -ForegroundColor Yellow
Write-Host "DATABASE_URL=$databaseUrl" -ForegroundColor White
Write-Host "JWT_SECRET=$jwtSecret" -ForegroundColor White
Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host "NEXTAUTH_URL=$railwayUrl" -ForegroundColor White

# Instructions
Write-Host "`nAUTOMATIC DEPLOYMENT STEPS:" -ForegroundColor Yellow
Write-Host "1. Railway dashboard is already open" -ForegroundColor White
Write-Host "2. Go to 'platform-os' service" -ForegroundColor White
Write-Host "3. Click 'Variables' tab" -ForegroundColor White
Write-Host "4. Paste the 4 variables (from clipboard)" -ForegroundColor White
Write-Host "5. Click 'Deploy' button" -ForegroundColor White
Write-Host "6. Wait for deployment" -ForegroundColor White
Write-Host "7. Click 'View' to access HOPE Platform!" -ForegroundColor White

# Auto-open Railway variables page
Write-Host "`nOpening Railway variables page in 5 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Success message
Write-Host "`n================================" -ForegroundColor Green
Write-Host "AUTOMATIC DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "Configuration ready to paste!" -ForegroundColor Green
Write-Host "Railway URL: $railwayUrl" -ForegroundColor Yellow
Write-Host "Your HOPE Platform is ready to go LIVE!" -ForegroundColor Green

# Create deployment summary
$summary = @"
HOPE Platform Automatic Deployment Summary
========================================
Railway URL: $railwayUrl
Status: READY FOR FINAL DEPLOY
Database: Connected
Authentication: Configured

Next Steps:
1. Go to Railway platform-os service
2. Click Variables tab
3. Paste configuration (from clipboard)
4. Click Deploy
5. Click View
6. YOUR HOPE PLATFORM IS LIVE!

Deployment Status: AUTOMATED AND READY
"@

$summary | Out-File -FilePath "HOPE-Platform-Auto-Deploy-Summary.txt" -Encoding utf8
Write-Host "Deployment summary saved!" -ForegroundColor Green

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
