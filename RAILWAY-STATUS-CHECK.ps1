# RAILWAY STATUS MONITORING
# Check deployment status and provide guidance

Write-Host "🚀 RAILWAY DEPLOYMENT STATUS" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

Write-Host "`nChecking Railway deployment status..." -ForegroundColor Yellow

# Check service status
try {
    $status = (Invoke-RestMethod -Uri "https://railway.app/api/v1/projects/hope-platform-v2/services" -Method GET -TimeoutSec 10).Content | ConvertFrom-Json | Out-String
    Write-Host "✅ Service Status Retrieved:" -ForegroundColor Green
    Write-Host $status -ForegroundColor White
} catch {
    Write-Host "❌ Failed to check status:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host "`nDeployment Status Analysis:" -ForegroundColor Yellow

if ($status -match '"status":"BUILDING"') {
    Write-Host "🔧 Status: BUILDING" -ForegroundColor Yellow
    Write-Host "⏱ Estimated time: 2-3 minutes" -ForegroundColor White
    Write-Host "📋 Action: Wait for completion" -ForegroundColor White
} elseif ($status -match '"status":"RUNNING"') {
    Write-Host "🎉 Status: RUNNING" -ForegroundColor Green
    Write-Host "🚀 Access URL: https://hope-platform-v2.up.railway.app" -ForegroundColor Cyan
    Write-Host "📋 Action: Test your platform!" -ForegroundColor White
} elseif ($status -match '"status":"FAILED"') {
    Write-Host "❌ Status: FAILED" -ForegroundColor Red
    Write-Host "🔧 Action: Check deployment logs" -ForegroundColor White
} else {
    Write-Host "❓ Status: UNKNOWN" -ForegroundColor Gray
    Write-Host "🔍 Action: Check Railway dashboard" -ForegroundColor White
}

Write-Host "`n==================================" -ForegroundColor Green
Write-Host "🎯 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. If RUNNING: Test your platform" -ForegroundColor White
Write-Host "2. If BUILDING: Wait 2-3 minutes" -ForegroundColor White
Write-Host "3. If FAILED: Check logs and redeploy" -ForegroundColor White
Write-Host "4. Keep checking every 30 seconds until RUNNING" -ForegroundColor White

Write-Host "`nPress any key to check status..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Loop to check status continuously
while ($true) {
    try {
        $status = (Invoke-RestMethod -Uri "https://railway.app/api/v1/projects/hope-platform-v2/services" -Method GET -TimeoutSec 10).Content | ConvertFrom-Json | Out-String
        
        Clear-Host
        Write-Host "🚀 RAILWAY STATUS CHECK" -ForegroundColor Green
        Write-Host "==================================" -ForegroundColor Green
        
        if ($status -match '"status":"BUILDING"') {
            Write-Host "🔧 Status: BUILDING - ⏱ $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Yellow
            Write-Host "⏱ Estimated completion: 2-3 minutes" -ForegroundColor White
        } elseif ($status -match '"status":"RUNNING"') {
            Write-Host "🎉 Status: RUNNING - 🚀 https://hope-platform-v2.up.railway.app" -ForegroundColor Green
            Write-Host "📋 Action: PLATFORM READY FOR TESTING!" -ForegroundColor White
            
            # Open platform in browser
            Start-Process "https://hope-platform-v2.up.railway.app"
            
            break
        } elseif ($status -match '"status":"FAILED"') {
            Write-Host "❌ Status: FAILED - 🔧 Check Railway dashboard" -ForegroundColor Red
        } else {
            Write-Host "❓ Status: UNKNOWN - 🔍 Check Railway dashboard" -ForegroundColor Gray
        }
    } catch {
        Write-Host "❌ Status check failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Start-Sleep -Seconds 30
}
