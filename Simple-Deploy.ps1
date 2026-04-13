# Simple HOPE Platform Deployment Script
Write-Host "HOPE Platform Railway Deployment" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green

Write-Host "Step 1: Check Railway deployment status" -ForegroundColor Yellow
Write-Host "Go to Railway dashboard and wait for 'Running' status" -ForegroundColor White

Write-Host "`nStep 2: Get your Railway values:" -ForegroundColor Yellow
Write-Host "1. Click 'postgres' service > 'Connect' tab" -ForegroundColor White
Write-Host "2. Copy DATABASE_URL" -ForegroundColor White
Write-Host "3. Click 'platform-os' service > 'Variables' tab" -ForegroundColor White
Write-Host "4. Copy JWT_SECRET" -ForegroundColor White

Write-Host "`nStep 3: Set environment variables:" -ForegroundColor Yellow
Write-Host "In Railway platform-os service > Variables, add:" -ForegroundColor White
Write-Host "DATABASE_URL=<your-postgres-connection-string>" -ForegroundColor Cyan
Write-Host "JWT_SECRET=<your-railway-secret>" -ForegroundColor Cyan
Write-Host "NODE_ENV=production" -ForegroundColor Cyan
Write-Host "NEXTAUTH_URL=<your-railway-url>" -ForegroundColor Cyan

Write-Host "`nStep 4: Deploy" -ForegroundColor Yellow
Write-Host "Click 'Deploy' button in Railway" -ForegroundColor White
Write-Host "Wait for deployment to complete" -ForegroundColor White
Write-Host "Click 'View' to access your HOPE Platform!" -ForegroundColor White

Write-Host "`nOpening Railway dashboard..." -ForegroundColor Green
Start-Process "https://railway.app"

Write-Host "`n=============================" -ForegroundColor Green
Write-Host "HOPE Platform Deployment Ready!" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green

Write-Host "Your self-maintaining HOPE Platform will be live!" -ForegroundColor Yellow
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
