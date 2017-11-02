import { app, BrowserWindow, screen, globalShortcut } from 'electron';
import * as path from 'path';

let win, serve, overlay;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

if (serve) {
  require('electron-reload')(__dirname, {
  });
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });
  win.loadURL('file://' + __dirname + '/index.html');
  if (serve) {
    win.webContents.openDevTools();
  }
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

function spawnOverlay() {
  const size = screen.getPrimaryDisplay().workAreaSize;
  overlay = new BrowserWindow({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    transparent: true,
    frame: false
  });
  overlay.loadURL('file://' + __dirname + '/../overlay.html');
  // overlay.loadURL('https://facebook.com');
  overlay.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    overlay = null;
  });
}
// and load the index.html of the app.


// Open the DevTools.

// Emitted when the window is closed.

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow();
    globalShortcut.register('Super+Y', () => {
      overlay ? overlay.close() : spawnOverlay() ;
      // Do stuff when Y and either Command/Control is pressed.
    })
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
