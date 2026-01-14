const { spawn } = require('child_process');
const path = require('path');

const projectDir = path.join(__dirname);
let backendProcess = null;

function startBackend() {
  console.log('[' + new Date().toLocaleString() + '] Starting backend server...');
  
  backendProcess = spawn('python', [
    '-m', 'uvicorn',
    'Backend.stock_anomaly_capstone.main:app',
    '--port', '8000',
    '--host', '127.0.0.1'
  ], {
    cwd: projectDir,
    stdio: ['ignore', 'inherit', 'inherit'],
    shell: true
  });

  backendProcess.on('exit', (code) => {
    console.log('[' + new Date().toLocaleString() + '] Backend process exited with code', code);
    console.log('[' + new Date().toLocaleString() + '] Restarting backend in 2 seconds...');
    setTimeout(startBackend, 2000);
  });

  backendProcess.on('error', (err) => {
    console.error('[' + new Date().toLocaleString() + '] Backend process error:', err);
  });
}

process.on('SIGINT', () => {
  console.log('\n[' + new Date().toLocaleString() + '] Shutting down backend...');
  if (backendProcess) {
    backendProcess.kill();
  }
  process.exit(0);
});

console.log('[' + new Date().toLocaleString() + '] Backend manager started');
startBackend();
