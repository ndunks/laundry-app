import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PengaturanComponent } from './pengaturan.component';
import { Routes, RouterModule } from '@angular/router';
const router: Routes = [
  {
    path: '',
    component: PengaturanComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  declarations: [PengaturanComponent],
  entryComponents: [PengaturanComponent]
})
export class PengaturanModule { }
