import { Injectable } from '@angular/core';
import { remote as electron } from "electron";
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { ConfigFileType } from '../interfaces';
import { AsyncSubject } from 'rxjs';
import * as sha1 from "sha1"




@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configFile = join( electron.getGlobal("path"), "config.json" )
  data: ConfigFileType
  ready: boolean = false
  readyState: AsyncSubject<ConfigFileType> = new AsyncSubject()
  
  constructor() {
    ( this.data as any ) = {}
    this.load()
    this.ready = true;
    this.readyState.next(this.data)
    this.readyState.complete()
  }

  load(){
    if(existsSync(this.configFile)){
      this.data = JSON.parse( readFileSync(this.configFile, {encoding: "utf8"}) )
    }else{
      this.data = null
    }
  }

  save(){
    console.log('Saving Data', this.configFile);
    return writeFileSync(this.configFile, JSON.stringify(this.data, null, 2))
  }

  exists(): boolean {
    return existsSync(this.configFile);
  }
  sessionIsLogin(){
    return !!(this.data.session && this.data.session.length > 0);
  }
  sessionLogout(){
    this.data.session = null;
    this.save()
  }
  sessionLogin(data: any): boolean {
    console.log('Users', this.data.users);
    
    if(!data.username || !data.password){
      return false
    }

    const found = this.data.users.filter(
                user => user.username.toLowerCase() == data.username.toLowerCase()
            )
    if( !found.length ){
      return false
    }
    const validUser = sha1(data.password) == found[0].password
    if( validUser ){
      this.data.session = found[0].username;
      this.save()
    }
    return validUser;
  }
}
