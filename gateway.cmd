@echo off
rem OpenClaw Gateway (v2026.3.23-2)
set "TMPDIR=C:\Users\15013\AppData\Local\Temp"
set "NODE_PATH=C:\Users\15013\AppData\Roaming\npm\node_modules"
set "OPENCLAW_GATEWAY_PORT=18789"
set "OPENCLAW_SYSTEMD_UNIT=openclaw-gateway.service"
set "OPENCLAW_WINDOWS_TASK_NAME=OpenClaw Gateway"
set "OPENCLAW_SERVICE_MARKER=openclaw"
set "OPENCLAW_SERVICE_KIND=gateway"
set "OPENCLAW_SERVICE_VERSION=2026.3.23-2"
"D:\Program Files\nodejs\node.exe" C:\Users\15013\AppData\Roaming\npm\node_modules\openclaw\dist\index.js gateway --port 18789
