const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow; // Store a reference to the main window
let newClassWindow; // Store a reference to the new class window

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

  mainWindow.loadURL('http://localhost:9000'); // Load the main React app
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

  newClassWindow.loadURL('http://localhost:9000/new-class'); // Adjust the URL to match your route

  // When the form is submitted, listen for the "add-class" event and send the data back to the main window
  ipcMain.on('add-class', (event, classData) => {
    mainWindow.webContents.send('add-class', classData); // Send data back to the main window
    if (newClassWindow) newClassWindow.close(); // Close new class window on save
  });

  newClassWindow.on('closed', () => {
    newClassWindow = null; // Dereference the window object to avoid memory leaks
  });
}

// Main application ready event
app.whenReady().then(() => {
  createWindow();

  ipcMain.on('open-new-class-window', () => {
    createNewClassWindow(); // Call the function to open a new window
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
