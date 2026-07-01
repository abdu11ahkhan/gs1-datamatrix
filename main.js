const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

app.setName('GS1 DataMatrix Generator');

function createWindow() {
  const win = new BrowserWindow({
    width: 1150,
    height: 780,
    minWidth: 940,
    minHeight: 660,
    title: 'GS1 DataMatrix Generator',
    icon: path.join(__dirname, 'build', 'icon.ico'),
    backgroundColor: '#eaeef4',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  });

  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  win.once('ready-to-show', () => win.show());

  // "Print label" opens a small child window (app calls window.open); allow it.
  win.webContents.setWindowOpenHandler(() => ({
    action: 'allow',
    overrideBrowserWindowOptions: {
      width: 420,
      height: 660,
      autoHideMenuBar: true,
      backgroundColor: '#ffffff'
    }
  }));

  // Keep everything inside the app; no external navigation.
  win.webContents.on('will-navigate', (e) => e.preventDefault());
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
