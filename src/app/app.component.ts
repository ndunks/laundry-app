import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DbService, ConfigService } from './@class/services';
import { merge, zip, AsyncSubject, BehaviorSubject } from 'rxjs';
import { ConfigFileType } from './@class/interfaces';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`

  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('spinner', {read: ElementRef}) spinner: ElementRef<HTMLDivElement>

  window_name: string
  ready: AsyncSubject<{
    db: any
    config: ConfigFileType
  }> = new AsyncSubject()
  loadingState = new BehaviorSubject<boolean>(true)

  constructor(
    location: Location,
    router: Router,
    db: DbService,
    config: ConfigService
  ) {
    zip(db.readyState, config.readyState,
      (dbState, configState) => ({
        db: dbState,
        config: configState
      })).subscribe(
      states => {
        this.ready.next(states);
        this.ready.complete();
        console.log('Yeah, is now ready', states);
      }
    )
    // If no configuration found, goto install page
    if(!config.exists()){
      router.navigate(['/install'])
      return;
    }else{
      // If counfigration exists and user on install page, redirect to home
      if(location.path(false).match(/install/)){
        router.navigate(['/home'])
        return;
      }
    }
    // 
    let args = process.argv.filter( v => v.indexOf("--window-name=") >= 0)
    if( ! args.length ){
      console.error("No Windows Name!");
    }else{
      this.window_name = args[0].split("=")[1];
      this.ready.subscribe(
        (states) => {
          
          console.log("Window Name: ", this.window_name);
          if(this.window_name != 'home' && 
          !states.config.session){
            // Force to home if not login
            router.navigate(['/home']);
          }else{
            router.navigate([`/${this.window_name}`]);
          }
        }
      )
    } 
  }
  loadingShow(){
    this.loading(true);
  }
  loadingHide(){
    this.loading(false)
  }
  loading(visible: boolean){
    this.spinner.nativeElement.style.display = visible ? 'block': 'none'
    this.loadingState.next(visible)
  }
}
