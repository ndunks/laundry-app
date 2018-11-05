// const electron = require('electron')
import {app, BrowserWindow, screen, WebPreferences, BrowserWindowConstructorOptions, ipcMain, Event} from "electron";
import { format as urlFormat} from "url"
import { join } from "path"
import { Manager } from "./electron-wm"
import * as fs from "fs"



// console.log('ARGS', process.argv0, process.argv);
const isDevMode = process.argv0.indexOf("/node_modules/electron/") >= 0
const angularDevServer = process.argv.indexOf('--angular-serve') >= 0

let rootAppUrl: string;
if( angularDevServer ){
    rootAppUrl = urlFormat({
        hostname: "localhost",
        path: '/',
        port: 4200,
        protocol: "http:"
    })
}else{
    rootAppUrl = urlFormat({
        pathname: join(__dirname, '\\'),
        protocol: 'file:',
        slashes: true
    })
}
// rootAppUrl += '/'

const defaultOptions: BrowserWindowConstructorOptions = {
    icon: 'res/favicon.ico',
    width: 950,
    height: 600,
    show: false,
    center: true
}

const _global = global as any

// Share the package JSON files
const packageJson = _global.package = require('./../package.json')

// Share the window manager to renderer
const manager = _global.windowManager = new Manager(rootAppUrl, isDevMode);

// Determine the data directory
const path = _global.path = join( process.env["LOCALAPPDATA"] || process.env["APPDATA"], packageJson.name);;

if(! fs.existsSync(path) ){
    fs.mkdirSync(path)
}

console.log("rootApp", rootAppUrl, 'Data path', _global.path);
ipcMain.on("openWindow", (e: Event, arg: string) => {
    e.returnValue = manager.open(arg, defaultOptions, true )
})
ipcMain.on("get", (e: Event, arg: string) => {
    try {
        const vars = arg.split(".");
        
        e.returnValue = eval(arg)
    } catch (error) {
        console.error("IPC Eval Err", error);
        e.returnValue = null;
    }
})

const appOnReady = () => {
    const mainWindowOptions: BrowserWindowConstructorOptions = {...defaultOptions, ...{
        width: 800,
        frame: false,
        center: false,
        webPreferences: {
            experimentalFeatures: true
        }
    }};
    const displays = screen.getAllDisplays()
    let selectedDisplay = 0;
    let displayArgs = process.argv.filter( v => v.indexOf("--display=") === 0)
    if( displayArgs.length ){
        selectedDisplay = Number.parseInt( displayArgs[ displayArgs.length - 1].split("=")[1] );
    }
    if(undefined == displays[selectedDisplay]){
        console.error("Selected display not exists:", selectedDisplay);
        selectedDisplay = 0
    }


    mainWindowOptions.height = displays[selectedDisplay].bounds.height;
    mainWindowOptions.x = displays[selectedDisplay].bounds.x + ( displays[selectedDisplay].bounds.width / 2 -  mainWindowOptions.width / 2  )
    mainWindowOptions.y = displays[selectedDisplay].bounds.y + ( displays[selectedDisplay].bounds.height / 2 -  mainWindowOptions.height / 2  )
    // Create the main window.
    // Detect preload page
    let args = process.argv.filter( v => v.indexOf("--page=") === 0)
    
    manager.open( args.length ? args[0].split("=")[1] : "home", mainWindowOptions, true)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', appOnReady);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    console.log('ALl windows closed, QUITING..');
    app.quit();
});
app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});
