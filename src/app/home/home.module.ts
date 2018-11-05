import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatListModule, MatMenuModule } from '@angular/material';
import { SharedModule } from '../shared.module';
const router: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'dash',
        component: DashComponent
      }
    ]
  }
]
console.log('HomeModule Loaded');

@NgModule({
  imports: [
    RouterModule.forChild(router),
    SharedModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    DashComponent
  ],
  bootstrap: [ HomeComponent ],
  entryComponents: [LoginComponent, DashComponent]
})
export class HomeModule { }
