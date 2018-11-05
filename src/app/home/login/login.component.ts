import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/@class/services';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  redirectAfterLogin = ['/home','dash'];
  constructor(
    private config: ConfigService,
    private router: Router,
    private app: AppComponent
  ) {
    this.redirectAfterLogin = [`/${app.window_name}`];
    if( config.sessionIsLogin() && location.pathname.indexOf('dahs') < 0 ){
      router.navigate(['/home','dash']);
    }
  }

  submit() {
    if ( this.config.sessionLogin(this.form.value) ) {
      this.router.navigate(this.redirectAfterLogin)
    }
  }

}
