import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButton, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule } from '@angular/material';
import { SharedModule } from '../shared.module';
import { DialogComponent } from './dialog/dialog.component';
const router: Routes = [
  {
    path: '',
    component: MemberComponent
  }
]
console.log('MemberModule Loaded');
@NgModule({
  imports: [
    RouterModule.forChild(router),
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
  ],
  declarations: [MemberComponent, DialogComponent],
  bootstrap: [MemberComponent],
  entryComponents: [DialogComponent]
})
export class MemberModule { }
