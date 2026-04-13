# HOPE Platform Railway Deployment Automation Script
# This script automates the entire Railway deployment process

Write-Host "HOPE Platform Railway Deployment Automation" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Step 1: Open Railway Dashboard
Write-Host "Step 1: Opening Railway Dashboard..." -ForegroundColor Yellow
Start-Process "https://railway.app"

# Step 2: Wait for user to get values
Write-Host "`nStep 2: Get your Railway values:" -ForegroundColor Yellow
Write-Host "1. Click 'postgres' service" -ForegroundColor White
Write-Host "2. Click 'Connect' tab" -ForegroundColor White
Write-Host "3. Copy the DATABASE_URL" -ForegroundColor White
Write-Host "4. Click 'platform-os' service" -ForegroundColor White
Write-Host "5. Click 'Variables' tab" -ForegroundColor White
Write-Host "6. Copy the JWT_SECRET" -ForegroundColor White

# Step 3: Get user input
Write-Host "`nStep 3: Enter your Railway values:" -ForegroundColor Yellow

$databaseUrl = Read-Host "Paste your DATABASE_URL (from postgres service)"
$jwtSecret = Read-Host "Paste your JWT_SECRET (from platform-os service)"

# Step 4: Validate inputs
if (-not $databaseUrl -or -not $jwtSecret) {
    Write-Host "Error: Both DATABASE_URL and JWT_SECRET are required!" -ForegroundColor Red
    exit 1
}

# Step 5: Create environment file
$envContent = @"
DATABASE_URL=$databaseUrl
JWT_SECRET=$jwtSecret
NODE_ENV=production
"@

$envContent | Out-File -FilePath ".env.production" -Encoding utf8
Write-Host "Environment file created: .env.production" -ForegroundColor Green

# Step 6: Display final configuration
Write-Host "`nStep 4: Final Configuration:" -ForegroundColor Yellow
Write-Host "DATABASE_URL=$databaseUrl" -ForegroundColor White
Write-Host "JWT_SECRET=$jwtSecret" -ForegroundColor White
Write-Host "NODE_ENV=production" -ForegroundColor White

# Step 7: Instructions for Railway
Write-Host "`nStep 5: Railway Deployment Instructions:" -ForegroundColor Yellow
Write-Host "1. In Railway dashboard, go to 'platform-os' service" -ForegroundColor White
Write-Host "2. Click 'Variables' tab" -ForegroundColor White
Write-Host "3. Add these 3 variables:" -ForegroundColor White
Write-Host "   DATABASE_URL=$databaseUrl" -ForegroundColor Cyan
Write-Host "   JWT_SECRET=$jwtSecret" -ForegroundColor Cyan
Write-Host "   NODE_ENV=production" -ForegroundColor Cyan
Write-Host "4. Click 'Deploy' button" -ForegroundColor White
Write-Host "5. Wait for deployment to complete" -ForegroundColor White
Write-Host "6. Click 'View' to access your HOPE Platform" -ForegroundColor White

# Step 8: Copy to clipboard
$finalConfig = @"
DATABASE_URL=$databaseUrl
JWT_SECRET=$jwtSecret
NODE_ENV=production
"@

$finalConfig | Set-Clipboard
Write-Host "`nConfiguration copied to clipboard!" -ForegroundColor Green

# Step 9: Success message
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "HOPE Platform Deployment Automation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Next: Go to Railway and paste the configuration" -ForegroundColor Yellow
Write-Host "Your HOPE Platform will be live after deployment!" -ForegroundColor Green

# Step 10: Open Railway variables page (after delay)
Write-Host "`nOpening Railway variables page in 5 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Note: You'll need to manually navigate to your specific project
Write-Host "Navigate to your platform-os service > Variables tab in Railway" -ForegroundColor White

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
