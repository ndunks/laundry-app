import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { ipcRenderer, remote } from "electron"
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '../@class/services';
import { Router } from '@angular/router';
import { Manager } from 'electron/electron-wm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  get title(): string {
    return this.config.sessionIsLogin() ? `Login: ${this.config.data.session}` :
          this.config.data.title || "Mboke Laundry"
  }
  backgroundImage = 'res/default_bg.jpg'
  @HostBinding('style') get style() { 
    return this.sanitizer.bypassSecurityTrustStyle(`background-image: url(${this.backgroundImage})`);
  }
  logo = 'res/default_logo.png'
  constructor(
    private sanitizer: DomSanitizer,
    private config: ConfigService,
    private router: Router
  ) {
    if( config.sessionIsLogin() && location.pathname.indexOf('dash') < 0 ){
      router.navigate(['/home','dash']);
    }
  }
  
  ngOnInit() {
    /* console.log('HomeInit', ipcRenderer);
    
     */
  }
  exit(){
    const manager: Manager = remote.getGlobal("windowManager");
    if(manager.count > 1 && !confirm("Keluar dan tutup semua jendela?")){
        return
    }
    remote.app.exit()
  }
  logout(){
    this.config.sessionLogout();
    this.router.navigate(['/home']);
  }
  

}
