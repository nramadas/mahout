var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

var win;

function createWindow() {
  win = new BrowserWindow({
    title: 'Mahout',
    width: 960,
    minWidth: 960,
    height: 1020
  });
  win.loadURL(`file://${__dirname}/mahout.html`);
  win.webContents.openDevTools();

  win.on('closed', function() {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (win === null) {
    createWindow();
  }
});
