const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev'); // 用于判断是否处于开发模式
const electronLocalshortcut = require('electron-localshortcut'); // 引入键盘快捷键库

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // 隐藏窗口控制按钮
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 最大化窗口
  mainWindow.maximize();

  // 加载 React 开发服务器的 URL
  // 如果是开发环境，加载 React 开发服务器的 URL
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // 如果是生产环境，加载打包后的 HTML 文件
    mainWindow.loadFile('build/index.html'); // 假设 build 是打包后的目录
  }

  // 隐藏窗口控制按钮
  mainWindow.setMenu(null);

  // 注册全局快捷键监听器
  electronLocalshortcut.register('CommandOrControl+Q', () => {
    app.quit();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
