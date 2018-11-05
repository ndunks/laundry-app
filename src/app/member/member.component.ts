import { Component, OnInit, ViewEncapsulation, ViewChild, ApplicationRef } from '@angular/core';
import { DbService } from '../@class/services';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AppComponent } from '../app.component';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class MemberComponent implements OnInit {
  db: Nedb
  data: any[] = []
  collumns      = []//[ 'id', 'nama', 'telepon', 'alamat', 'created']
  sort_col      = 'nama'
  sort_direction= 'asc'
  paging_total  = 0
  paging_size   = 10
  paging_options= [5, 10, 25, 50]
  searchInput = new FormControl()
  reloadEvent = new Subject<any>()
  /* @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort */
  loading = true

  constructor(
    dbService: DbService,
    private app: AppComponent,
    private dialogCtrl: MatDialog
  ) {
    this.db = dbService.get( "member" )
  }
  ngOnInit() {
    this.app.loadingHide()
  }
  add(){
    const dialog = this.dialogCtrl.open(
      DialogComponent,
      {
      }
    )
    dialog.afterClosed().subscribe(
      data => {
        console.log("Dialog CLosed", data); 
        // Maybe still visible by clicking backdrop
        this.app.loadingHide()
      }
    )
  }

}
