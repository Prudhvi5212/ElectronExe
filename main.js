/*jshint esversion: 6 */
const { app, BrowserWindow , Notification, ipcMain, Tray , Menu , application } = require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var AutoLaunch = require('auto-launch');

let notify = require('./notify');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('main.html');

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null;
app.on('ready', () => {
  tray = new Tray('/home/cioc/Desktop/Electron-Com-master/assets/icons/tray.png');
  const contextMenu = Menu.buildFromTemplate([
    {
               label: 'Show App', click: function () {
                   win.show();
               }
           },
           {
            label: 'Quit', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
});

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
var minecraftAutoLauncher = new AutoLaunch({
    name: 'My-First-App',
    path: '/home/cioc/Desktop/Electron-Com-master/release-builds/My-First-App-linux-x64/My-First-App',
});

minecraftAutoLauncher.enable();

//minecraftAutoLauncher.disable();


minecraftAutoLauncher.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
        return;
    }
    minecraftAutoLauncher.enable();
})
.catch(function(err){
    // handle error
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
