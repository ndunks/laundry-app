import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';


if (environment.production) {
  enableProdMode();
}
if( location.hash == '#install' ){
  // Installation page redirect
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
