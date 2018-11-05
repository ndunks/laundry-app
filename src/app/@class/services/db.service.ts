import { Injectable } from '@angular/core';
import * as NeDB from "nedb";
import { remote as electron, remote } from "electron";
import { join } from "path"
import { AsyncSubject } from 'rxjs';

export type DatabasesNames = "layanan" | "transaksi" | "member";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  ready: boolean = false
  readyState: AsyncSubject<boolean> = new AsyncSubject()
  path = remote.getGlobal("path")
  documentNames = ["services", "transactions"]
  documents: {[name: string]: NeDB} = {}


  constructor() {
    this.readyState.next(true)
    this.readyState.complete()
    this.ready = true
  }
  
  get(dbName: DatabasesNames, autoload = true ): NeDB {
    if( undefined == this.documents[dbName]){
      console.log('DB: ', dbName, 'LOAD');
      
      this.documents[dbName] = new NeDB({
        autoload: autoload,
        filename: join(this.path, `${dbName}.db`)
      })
    }else{
      console.log('DB: ', dbName, 'loaded');
    }
    return this.documents[dbName]
  }
}
