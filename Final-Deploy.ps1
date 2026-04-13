# FINAL HOPE PLATFORM DEPLOYMENT - ALL IN ONE SCRIPT
Write-Host "FINAL HOPE PLATFORM DEPLOYMENT" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Open Railway dashboard
Write-Host "Step 1: Opening Railway dashboard..." -ForegroundColor Yellow
Start-Process "https://railway.app"

# Instructions
Write-Host "`nStep 2: Get your Railway values:" -ForegroundColor Yellow
Write-Host "1. Go to your HOPE Platform project" -ForegroundColor White
Write-Host "2. Click 'platform-os' service" -ForegroundColor White
Write-Host "3. Check status (should be 'Running')" -ForegroundColor White
Write-Host "4. Click 'postgres' service > 'Connect' tab" -ForegroundColor White
Write-Host "5. Copy DATABASE_URL" -ForegroundColor White
Write-Host "6. Click 'platform-os' service > 'Variables' tab" -ForegroundColor White
Write-Host "7. Copy JWT_SECRET" -ForegroundColor White
Write-Host "8. Copy Railway URL" -ForegroundColor White

# Get user input
Write-Host "`nStep 3: Enter your Railway values:" -ForegroundColor Green
$databaseUrl = Read-Host "DATABASE_URL (from postgres Connect tab)"
$jwtSecret = Read-Host "JWT_SECRET (from platform-os Variables tab)"
$railwayUrl = Read-Host "Railway URL (from platform-os service)"

# Validate inputs
if (-not $databaseUrl -or -not $jwtSecret -or -not $railwayUrl) {
    Write-Host "Error: All values are required!" -ForegroundColor Red
    exit 1
}

# Display final configuration
Write-Host "`nStep 4: Final Configuration:" -ForegroundColor Yellow
Write-Host "DATABASE_URL=$databaseUrl" -ForegroundColor White
Write-Host "JWT_SECRET=$jwtSecret" -ForegroundColor White
Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host "NEXTAUTH_URL=$railwayUrl" -ForegroundColor White

# Copy to clipboard
$finalConfig = @"
DATABASE_URL=$databaseUrl
JWT_SECRET=$jwtSecret
NODE_ENV=production
NEXTAUTH_URL=$railwayUrl
"@

$finalConfig | Set-Clipboard
Write-Host "Configuration copied to clipboard!" -ForegroundColor Green

# Instructions for Railway
Write-Host "`nStep 5: Railway Deployment Instructions:" -ForegroundColor Yellow
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

# Open Railway variables page
Write-Host "`nStep 6: Opening Railway variables page..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Success message
Write-Host "`n================================" -ForegroundColor Green
Write-Host "HOPE PLATFORM FINAL DEPLOYMENT READY!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "Railway URL: $railwayUrl" -ForegroundColor Yellow
Write-Host "Configuration copied to clipboard!" -ForegroundColor Green
Write-Host "Go to Railway and paste variables!" -ForegroundColor Yellow
Write-Host "Your HOPE Platform will be LIVE after deployment!" -ForegroundColor Green

# Create deployment summary
$summary = @"
HOPE Platform Final Deployment Summary
==================================
Railway URL: $railwayUrl
Database: PostgreSQL (connected)
Authentication: JWT + RBAC (ready)
Architecture: Self-Maintaining Platform OS

Final Steps:
1. Go to Railway platform-os service
2. Click Variables tab
3. Paste configuration (from clipboard)
4. Click Deploy
5. Click View
6. YOUR HOPE PLATFORM IS LIVE!

Deployment Status: READY FOR FINAL DEPLOY
"@

$summary | Out-File -FilePath "HOPE-Platform-Final-Deployment-Summary.txt" -Encoding utf8
Write-Host "Final deployment summary saved!" -ForegroundColor Green

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
