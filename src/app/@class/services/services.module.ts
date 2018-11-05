import { NgModule } from '@angular/core';
import { DbService } from './db.service';
import { ConfigService } from './config.service';



@NgModule({
  providers: [ConfigService, DbService]
})
export class ServicesModule { }
