const { app, BrowserWindow, session } = require('electron')

async function createWindow() {
  // Usamos la sesión por defecto o una partición limpia
  const ses = session.defaultSession

  // Limpiamos agresivamente todo el almacenamiento de cookies y caché antes de abrir
  await ses.clearStorageData({
    storages: ['cookies', 'localStorage', 'shadercache', 'websql', 'indexdb']
  })
  await ses.clearCache()

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  mainWindow.loadURL('https://erp-ecf-three.vercel.app')
}

app.whenReady().then(async () => {
  await createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})