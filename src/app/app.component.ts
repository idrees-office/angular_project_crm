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

    var pageAccessToken =
      'EAAPKZC44rZA5kBO06ZBZAF8bCyGQQb1cdez6oj89BUWZAZCFP5F4CM4ZAmHm10xW7bbJT2LxLDkvDfE336oK5qoNZAb5ZA4lZAHJTpwADZCrxNQGYWnvQn45CJjO9as2UkSTJWuUUpCIaZBvxZCXe3EQnCWY5ZAsZA9hSIHgNnQGiz1jz7vbFH62R4xBsHbDK57Wt6ZAEzs2tgjIQd0iULyUAdfkbMnMUvcUk27RPMoZAMwZDZD|faketoken';
    FB.api(
      '/me/conversations',
      {
        access_token: pageAccessToken,
      },
      function (response: any) {
        console.log(response);
      }
    );
  }
  // 111856167337521

  initFacebookSdk(): void {
    FB.init({
      appId: '1067623880812441',
      xfbml: true,
      version: 'v19.0',
    });
  }
}
