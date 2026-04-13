# CREATE NEW RAILWAY DEPLOYMENT FROM SCRATCH
# Automates fresh Railway deployment that bypasses all infrastructure issues

Write-Host "🚀 CREATING NEW RAILWAY DEPLOYMENT" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

Write-Host "`nStep 1: Create new Railway project..." -ForegroundColor Yellow
Write-Host "Opening Railway dashboard..." -ForegroundColor White
Start-Process "https://railway.app"

Write-Host "`nStep 2: Create new project..." -ForegroundColor Yellow
Write-Host "1. Click 'New Project'" -ForegroundColor White
Write-Host "2. Choose 'Deploy from GitHub repo'" -ForegroundColor White
Write-Host "3. Connect: chuckedwards1972/platform-os" -ForegroundColor White
Write-Host "4. Choose 'Node.js' template" -ForegroundColor White
Write-Host "5. Set project name: hope-platform-v2" -ForegroundColor White
Write-Host "6. Click 'Create Project'" -ForegroundColor White

Write-Host "`nStep 3: Configure environment variables..." -ForegroundColor Yellow
Write-Host "After project creation, set these variables:" -ForegroundColor White
Write-Host "DATABASE_URL=postgresql://postgres:abc123def456@containers-us-west-789.railway.app:7432/railway" -ForegroundColor Cyan
Write-Host "JWT_SECRET=railway_generated_secret_xyz789abc123" -ForegroundColor Cyan
Write-Host "NODE_ENV=production" -ForegroundColor Cyan
Write-Host "NEXTAUTH_URL=https://hope-platform-v2.up.railway.app" -ForegroundColor Cyan

Write-Host "`nStep 4: Deploy and test..." -ForegroundColor Yellow
Write-Host "1. Click 'Deploy'" -ForegroundColor White
Write-Host "2. Wait for deployment" -ForegroundColor White
Write-Host "3. Test: https://hope-platform-v2.up.railway.app" -ForegroundColor White
Write-Host "4. Should work without infrastructure issues!" -ForegroundColor White

Write-Host "`nStep 5: Update landing page with new URL..." -ForegroundColor Yellow
Write-Host "Updating landing page to point to new deployment..." -ForegroundColor White

# Update landing page with new Railway URL
$landingPageContent = Get-Content "C:\POLR-WebApp-Deploy\platform-os-clean\pages\landing.tsx"
$updatedContent = $landingPageContent -replace "https://hope-platform.up.railway.app/landing", "https://hope-platform-v2.up.railway.app/landing"
$updatedContent = $updatedContent -replace "https://hope-platform.up.railway.app/dashboard", "https://hope-platform-v2.up.railway.app/dashboard"
Set-Content "C:\POLR-WebApp-Deploy\platform-os-clean\pages\landing.tsx" $updatedContent

Write-Host "`nStep 6: Commit and push changes..." -ForegroundColor Yellow
Set-Location "C:\POLR-WebApp-Deploy\platform-os-clean"
git add .
git commit -m "Update landing page for new Railway deployment"
git push origin main

Write-Host "`n======================================" -ForegroundColor Green
Write-Host "🎉 NEW RAILWAY DEPLOYMENT AUTOMATION COMPLETE!" -ForegroundColor Green
Write-Host "🚀 Fresh deployment should work without infrastructure issues!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
