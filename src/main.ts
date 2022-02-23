import {
  app,
  BrowserWindow,
  nativeTheme,
  dialog,
  ipcMain,
  Menu,
  shell,
} from "electron";
// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const SPLASH_SCREEN_WEBPACK_ENTRY: string;

nativeTheme.themeSource = "dark";
const isMac = process.platform === "darwin";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

let splash: BrowserWindow;
let mainWindow: BrowserWindow;

const registerEventHandlers = () => {
  ipcMain.handle("quit-application", async () => {
    app.exit();
  });

  ipcMain.handle("relaunch-application", async () => {
    app.relaunch();
    app.exit();
  });

  ipcMain.handle("get-app-version", async () => app.getVersion());
};

const doSplashScreenChecks = async () =>
  new Promise<void>((resolve) => {
    splash = new BrowserWindow({
      width: 400,
      height: 400,
      frame: false,
      backgroundColor: "#2D3748",
      center: true,
      minWidth: 400,
      minHeight: 400,
      maxWidth: 400,
      maxHeight: 400,
      resizable: false,
      minimizable: true,
      maximizable: false,
      closable: false,
      alwaysOnTop: false,
      titleBarStyle: "hidden",
      webPreferences: {
        webSecurity: false,
        nativeWindowOpen: true,
        nodeIntegration: true,
        contextIsolation: false,
      },
      // icon: `${__dirname}/public/icons/cross_platform/icon`,
      show: false,
    });
    splash.loadURL(SPLASH_SCREEN_WEBPACK_ENTRY);

    splash.once("ready-to-show", () => {
      splash.show();
      //splash.webContents.openDevTools();
    });

    splash.on("close", () => {
      if (mainWindow) {
        mainWindow.destroy();
      }
    });

    // Send events to splash screen renderer as they happen
    // Added some sleep functions so I can see that this is doing what I want it to
    // TODO: Remove the sleeps (or maybe not, since it feels more like something is happening here)
    splash.webContents.once("dom-ready", async () => {
      registerEventHandlers();

      splash.webContents.send("splash-finish");

      resolve();
    });

    const showMainWindow = () => {
      splash.destroy();
      mainWindow.maximize();
      mainWindow.show();
    };

    ipcMain.once("backend-ready", () => {
      mainWindow.webContents.once("dom-ready", async () => {
        splash.on("close", () => {});
        showMainWindow();
      });
    });

    mainWindow.webContents.once("dom-ready", async () => {
      ipcMain.removeHandler("backend-ready");
      ipcMain.once("backend-ready", () => {
        splash.on("close", () => {});
        showMainWindow();
      });
    });
  });

const createWindow = async (): Promise<void> => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: "#1A202C",
    minWidth: 720,
    minHeight: 640,
    darkTheme: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    },
    // icon: `${__dirname}/public/icons/cross_platform/icon`,
    show: false,
  });
  await doSplashScreenChecks();

  // and load the index.html of the app.
  await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.