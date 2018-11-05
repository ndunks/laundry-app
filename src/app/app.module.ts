import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { ServicesModule } from './@class/services';






const entryPoint = '/home';//process.argv.indexOf("--install") >= 0 ? '/install'  : '/home';
const router: Routes = [
  {
    path: 'index.html',
    redirectTo: entryPoint
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: entryPoint
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'install',
    loadChildren: './install/install.module#InstallModule'
  },
  {
    path: 'pengaturan',
    loadChildren: './pengaturan/pengaturan.module#PengaturanModule'
  },
  {
    path: 'member',
    loadChildren: './member/member.module#MemberModule'
  }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(router),
    ServicesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
