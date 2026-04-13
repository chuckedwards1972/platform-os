# HOPE Platform Complete Railway Deployment Script
# This script automates the final deployment process

Write-Host "HOPE Platform Complete Railway Deployment" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Step 1: Check Railway deployment status
Write-Host "Step 1: Checking Railway deployment status..." -ForegroundColor Yellow
Write-Host "Go to Railway dashboard and check if deployment shows 'Running' status" -ForegroundColor White
Write-Host "URL will appear like: https://platform-os-xxxx.railway.app" -ForegroundColor White

# Step 2: Get user confirmation
Write-Host "`nStep 2: Is Railway deployment showing 'Running' status?" -ForegroundColor Yellow
$ready = Read-Host "Type 'yes' to continue (or 'no' to wait longer)"

if ($ready -ne "yes") {
    Write-Host "Wait for deployment to complete, then run this script again." -ForegroundColor Red
    exit 1
}

# Step 3: Get Railway URL
Write-Host "`nStep 3: Enter your Railway URL:" -ForegroundColor Yellow
$railwayUrl = Read-Host "Paste your Railway URL (e.g., https://platform-os-xxxx.railway.app)"

if (-not $railwayUrl) {
    Write-Host "Error: Railway URL is required!" -ForegroundColor Red
    exit 1
}

# Step 4: Get DATABASE_URL
Write-Host "`nStep 4: Get DATABASE_URL from Railway:" -ForegroundColor Yellow
Write-Host "1. Click 'postgres' service in Railway" -ForegroundColor White
Write-Host "2. Click 'Connect' tab" -ForegroundColor White
Write-Host "3. Copy the connection string" -ForegroundColor White
$databaseUrl = Read-Host "Paste your DATABASE_URL"

# Step 5: Get JWT_SECRET
Write-Host "`nStep 5: Get JWT_SECRET from Railway:" -ForegroundColor Yellow
Write-Host "1. Click 'platform-os' service" -ForegroundColor White
Write-Host "2. Click 'Variables' tab" -ForegroundColor White
Write-Host "3. Copy the JWT_SECRET" -ForegroundColor White
$jwtSecret = Read-Host "Paste your JWT_SECRET"

# Step 6: Validate inputs
if (-not $databaseUrl -or -not $jwtSecret) {
    Write-Host "Error: Both DATABASE_URL and JWT_SECRET are required!" -ForegroundColor Red
    exit 1
}

# Step 7: Display final configuration
Write-Host "`nStep 6: Final Configuration:" -ForegroundColor Yellow
Write-Host "DATABASE_URL=$databaseUrl" -ForegroundColor White
Write-Host "JWT_SECRET=$jwtSecret" -ForegroundColor White
Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host "NEXTAUTH_URL=$railwayUrl" -ForegroundColor White

# Step 8: Copy to clipboard
$finalConfig = @"
DATABASE_URL=$databaseUrl
JWT_SECRET=$jwtSecret
NODE_ENV=production
NEXTAUTH_URL=$railwayUrl
"@

$finalConfig | Set-Clipboard
Write-Host "`nConfiguration copied to clipboard!" -ForegroundColor Green

# Step 9: Instructions for final deployment
Write-Host "`nStep 7: Final Deployment Instructions:" -ForegroundColor Yellow
Write-Host "1. In Railway dashboard, go to 'platform-os' service" -ForegroundColor White
Write-Host "2. Click 'Variables' tab" -ForegroundColor White
Write-Host "3. Add these 4 variables (paste from clipboard):" -ForegroundColor White
Write-Host "   DATABASE_URL=$databaseUrl" -ForegroundColor Cyan
Write-Host "   JWT_SECRET=$jwtSecret" -ForegroundColor Cyan
Write-Host "   NODE_ENV=production" -ForegroundColor Cyan
Write-Host "   NEXTAUTH_URL=$railwayUrl" -ForegroundColor Cyan
Write-Host "4. Click 'Deploy' button" -ForegroundColor White
Write-Host "5. Wait for deployment to complete" -ForegroundColor White
Write-Host "6. Click 'View' to access your HOPE Platform!" -ForegroundColor White

# Step 10: Open Railway
Write-Host "`nStep 8: Opening Railway dashboard..." -ForegroundColor Yellow
Start-Process "https://railway.app"

# Step 11: Success message
Write-Host "`n====================================" -ForegroundColor Green
Write-Host "HOPE Platform Complete Deployment Ready!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host "Your Railway URL: $railwayUrl" -ForegroundColor Yellow
Write-Host "Configuration copied to clipboard!" -ForegroundColor Green
Write-Host "Go to Railway and paste the variables!" -ForegroundColor Yellow
Write-Host "Your HOPE Platform will be live after final deploy!" -ForegroundColor Green

# Step 12: Create deployment summary
$summary = @"
HOPE Platform Deployment Summary
============================
Railway URL: $railwayUrl
Database: PostgreSQL (connected)
Authentication: JWT + RBAC (ready)
Architecture: Self-Maintaining Platform OS

Next Steps:
1. Paste variables in Railway
2. Click Deploy
3. Click View to access HOPE Platform
4. Your self-maintaining platform is LIVE!

Deployment Status: READY FOR FINAL DEPLOY
"@

$summary | Out-File -FilePath "HOPE-Platform-Deployment-Summary.txt" -Encoding utf8
Write-Host "`nDeployment summary saved to: HOPE-Platform-Deployment-Summary.txt" -ForegroundColor Green

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
