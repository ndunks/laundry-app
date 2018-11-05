import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { resolve } from "url";
/**
 * Electron Window Manager Class
 */
console.log("ELECTRON Windows Manager Loaded");

export class Manager {

    windows: {[name: string] : BrowserWindow} = {}
    constructor(
        public rootAppUrl: string,
        public isDevMode: boolean
    ){

    }
    get names(): string[] {
        return Object.keys(this.windows);
    }
    get count(): number {
        return Object.keys(this.windows).length
    }
    closeAll(){
        this.names.forEach(
            name => {
                this.windows[name].close()
            }
        )
    }
    open(path: string, options: BrowserWindowConstructorOptions, openDevtools = false): string {
        
        const win_name = path
        const mainWindowUrl = resolve(this.rootAppUrl, "index.html");
        options.webPreferences = options.webPreferences || {}
        options.webPreferences.additionalArguments =  [`--window-name=${win_name}`];
        if( !!this.windows[win_name] ){
            console.log("Windows already loaded");
            this.windows[win_name].focus()
            return win_name;
        }

        const win = new BrowserWindow(options)
        
        this.windows[win_name] = win;

        console.log('Open New URL', path, mainWindowUrl);
        // Show when ready
        win.once('ready-to-show', () => {
            win.show()
            if( openDevtools ){
                win.webContents.openDevTools();
            }
        })

        win.loadURL( mainWindowUrl );
        
        win.on('closed', () => {
            console.log("Window Closed", win_name);
            this.windows[ win_name ] = null
            delete this.windows[ win_name ];
        });
        // Return the windows ID (Index)
        return win_name;
    }
 }
 