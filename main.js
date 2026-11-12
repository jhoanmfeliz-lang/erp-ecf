const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    icon: path.join(__dirname, 'public/logo.png'), // Logo oficial en la ventana
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Carga la aplicación local corriendo en Next.js (puerto 3000)
  mainWindow.loadURL('http://localhost:3000');
  
  // Ocultar la barra de menú superior por defecto para que luzca como app de escritorio formal
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});