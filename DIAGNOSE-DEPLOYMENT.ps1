# HOPE PLATFORM DEPLOYMENT DIAGNOSTIC
Write-Host "HOPE PLATFORM DEPLOYMENT DIAGNOSTIC" -ForegroundColor Yellow
Write-Host "===================================" -ForegroundColor Yellow

Write-Host "`nStep 1: Opening Railway dashboard..." -ForegroundColor Green
Start-Process "https://railway.app"

Write-Host "`nStep 2: Check these items in Railway dashboard:" -ForegroundColor Yellow
Write-Host "1. platform-os service status" -ForegroundColor White
Write-Host "2. Environment variables (Variables tab)" -ForegroundColor White
Write-Host "3. Recent logs (Logs tab)" -ForegroundColor White
Write-Host "4. Error messages or warnings" -ForegroundColor White

Write-Host "`nStep 3: Required Environment Variables:" -ForegroundColor Yellow
Write-Host "DATABASE_URL=postgresql://postgres:abc123def456@containers-us-west-789.railway.app:7432/railway" -ForegroundColor Cyan
Write-Host "JWT_SECRET=railway_generated_secret_xyz789abc123" -ForegroundColor Cyan
Write-Host "NODE_ENV=production" -ForegroundColor Cyan
Write-Host "NEXTAUTH_URL=https://platform-os-production.up.railway.app" -ForegroundColor Cyan

Write-Host "`nStep 4: Common Issues to Check:" -ForegroundColor Yellow
Write-Host "- Missing environment variables" -ForegroundColor White
Write-Host "- Database connection failures" -ForegroundColor White
Write-Host "- Authentication system errors" -ForegroundColor White
Write-Host "- Port/proxy configuration issues" -ForegroundColor White

Write-Host "`nStep 5: If errors found:" -ForegroundColor Yellow
Write-Host "1. Copy error messages" -ForegroundColor White
Write-Host "2. Check environment variables" -ForegroundColor White
Write-Host "3. Redeploy if needed" -ForegroundColor White

Write-Host "`n===================================" -ForegroundColor Green
Write-Host "DIAGNOSTIC COMPLETE" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
