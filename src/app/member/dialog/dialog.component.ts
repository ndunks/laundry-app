import { Component, OnInit, ViewEncapsulation, Inject, ApplicationRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { DbService } from 'src/app/@class/services';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent {
  form: FormGroup;
  db: Nedb
  constructor(
    public dialog: MatDialogRef<DialogComponent>,
    public appRef: ApplicationRef,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    fb: FormBuilder,
    dbService: DbService
  ) {
    this.db = dbService.get("member")
    this.form = fb.group({
      nama: ["", Validators.required],
      telepon: [""],
      alamat: [""]
    })
    console.log("Data", data);
  }
  get app(): AppComponent {
    return this.appRef.components[0].instance
  }
  get title(): string {
    return (this.data && this.data.nama) ? `Ubah ${this.data.nama}` : 'Tambah Baru'
  }
  submit()
  {
    this.app.loadingShow()
    console.log("Save", this.form.value);
  }

}
