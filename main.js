const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let newClassWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL('http://localhost:9000');
}

function createNewClassWindow() {
  newClassWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  newClassWindow.loadURL('http://localhost:9000/new-class');

  newClassWindow.on('closed', () => {
    newClassWindow = null; // Dereference the window object to avoid memory leaks
  });
}

// Handle adding a new class and closing the new class window
ipcMain.on('add-class', (event, classData) => {
  if (mainWindow) {
    mainWindow.webContents.send('add-class', classData); // Send data to the main window
  }
  if (newClassWindow) {
    newClassWindow.close(); // Close the new class window after sending data
  }
});

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('open-new-class-window', () => {
    createNewClassWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
