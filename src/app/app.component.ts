import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tweetapp-ui';
  isAuthenticated = false;
  userData: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.autoLogin();
    this.auth.user.subscribe((user) => {
      this.userData = user;
      this.isAuthenticated = user ? true : false;
      console.log("user=", user);
    })
  }

  OnLogout() {
    this.auth.logout()
  }

}
