# RECONNECT RAILWAY TO GITHUB
# Step-by-step guide to restore Railway-GitHub integration

Write-Host "🔗 RECONNECT RAILWAY TO GITHUB" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

Write-Host "`nStep 1: Open Railway Dashboard" -ForegroundColor Yellow
Write-Host "1. Go to: https://railway.app" -ForegroundColor White
Write-Host "2. Login to your account" -ForegroundColor White
Write-Host "3. Navigate to hope-platform-v2 service" -ForegroundColor White

Write-Host "`nStep 2: Disconnect Current GitHub" -ForegroundColor Yellow
Write-Host "1. In service settings, go to GitHub tab" -ForegroundColor White
Write-Host "2. Click 'Disconnect' if connected" -ForegroundColor White
Write-Host "3. Confirm disconnection" -ForegroundColor White

Write-Host "`nStep 3: Reconnect GitHub Repository" -ForegroundColor Yellow
Write-Host "1. Go to GitHub tab in service settings" -ForegroundColor White
Write-Host "2. Click 'Connect GitHub repo'" -ForegroundColor White
Write-Host "3. Enter: chuckedwards1972/platform-os" -ForegroundColor White
Write-Host "4. Select main branch" -ForegroundColor White
Write-Host "5. Click 'Connect'" -ForegroundColor White
Write-Host "6. Wait for sync to complete" -ForegroundColor White

Write-Host "`nStep 4: Redeploy Service" -ForegroundColor Yellow
Write-Host "1. After reconnection, Railway will auto-redeploy" -ForegroundColor White
Write-Host "2. Monitor deployment status" -ForegroundColor White
Write-Host "3. Test: https://hope-platform-v2.up.railway.app" -ForegroundColor White

Write-Host "`nStep 5: Alternative - Create New Project" -ForegroundColor Yellow
Write-Host "If reconnection fails:" -ForegroundColor White
Write-Host "1. Click 'New Project' in Railway dashboard" -ForegroundColor White
Write-Host "2. Choose 'Deploy from GitHub repo'" -ForegroundColor White
Write-Host "3. Connect: chuckedwards1972/platform-os" -ForegroundColor White
Write-Host "4. Use Node.js template" -ForegroundColor White
Write-Host "5. Set environment variables" -ForegroundColor White
Write-Host "6. Deploy" -ForegroundColor White

Write-Host "`n======================================" -ForegroundColor Green
Write-Host "🎯 RECONNECTION OPTIONS AVAILABLE" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

Write-Host "`nChoose your approach:" -ForegroundColor Yellow
Write-Host "1. Run reconnection script (recommended)" -ForegroundColor White
Write-Host "2. Create new Railway project (alternative)" -ForegroundColor White

Write-Host "`nPress any key to open Railway dashboard..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Auto-open Railway dashboard
Start-Process "https://railway.app"

Write-Host "`nReconnection guide created. Follow steps to restore deployment!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host "🚀 RAILWAY RECONNECTION SYSTEM READY" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
