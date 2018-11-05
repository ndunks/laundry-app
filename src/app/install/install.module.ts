import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallComponent } from './install.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';
const router: Routes = [
  {
    path: '',
    component: InstallComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  declarations: [InstallComponent],
  entryComponents: [InstallComponent]
})
export class InstallModule { }
