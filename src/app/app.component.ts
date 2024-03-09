import { Component, OnInit } from '@angular/core';

declare const FB: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Evernest Real Estate';

  ngOnInit(): void {
    this.initFacebookSdk();
  }

  initFacebookSdk(): void {
    FB.init({
      appId: '1067623880812441',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v12.0',
    });
  }
}
