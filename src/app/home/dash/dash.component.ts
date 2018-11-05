import { Component, ViewEncapsulation } from '@angular/core';

import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class DashComponent {
  menuPages = [
    {
      name: 'transaksi'
    },
    {
      name: 'layanan'
    },
    {
      name: 'laporan'
    },
    {
      name: 'stok'
    },
    {
      name: 'diskon'
    },
    {
      name: 'pengaturan'
    },
    {
      name: 'member'
    }
  ]
  constructor() { }

  openWindow(name: string ){
    const response = ipcRenderer.sendSync("openWindow", name)
    console.log('IPC RESPONSE', response);
  }

}
