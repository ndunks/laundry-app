import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { writeFileSync } from 'fs';
import {  of } from 'rxjs';
import { concatMap, delay } from "rxjs/operators";
import defaultConfig from "../../environments/default-config"
import { Router } from '@angular/router';
import * as sha1 from "sha1";
import { ConfigService } from '../@class/services';


@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InstallComponent implements OnInit {
  progress = false
  title = "Pemasangan Aplikasi"
  status = "Proses ini akan menerapkan konfigurasi bawaan dari aplikasi."
  buttonText = "Mulai Proses"
  backgroundImage = defaultConfig.config.background
  done = false
  @HostBinding('style') get style() { 
    return this.sanitizer.bypassSecurityTrustStyle(`background-image: url(${this.backgroundImage})`);
  }
  constructor(
    private sanitizer: DomSanitizer,
    private config: ConfigService,
    private router: Router
    ) { }

  ngOnInit() {

  }
  process(){
    if( this.done ){
      this.router.navigate(['/home'])
      return;
    }
    this.progress = true
    of(...this.install)
    .pipe(
      concatMap(x => of(x).pipe( delay(2000)) )
    ) .subscribe({
      next(fn) {
        fn.apply(this)
      }
    });

    
  }
  install: Function[] = [
    async () => {
      this.title = "Konfigurasi Default";
      this.status = "File " + this.config.configFile
      // Hashing the password
      defaultConfig.config.users.forEach(
        (user) => {
          user.password = sha1(user.password)
        }
      )
      this.config.data = defaultConfig.config;
      this.config.save()

    },
    () => {
      this.title = "Basis Data"
      this.status = "Menerapkan konfigurasi DB bawaan"
    },
    () => {
      this.title = "Selesai"
      this.status = "Proses installasi selesai, silahkan klik 'Masuk ke App'"
      this.buttonText = "Masuk ke App"
      this.done = true
      this.progress = false
    }
  ]

}
