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
      'EAAPKZC44rZA5kBOzZBynMs020P7q6ftZCmploIruzEPEMHh5SZBXZCcg5rZAnY391lWmugafZC1QOUyL6Eq09jZA0m5skkZCVUOIolFFolOxJBfUVjglnCs5fnZCqTyubwarEz2gUASERUc1owdqZCapJIGFtMZAJ3WLCcZCBTgTuelYF4OnOlSyqgRSvt4TlYpZB0fWWsLQHcAJj7vpPIo4zZCGSqbRIsZCVUiFuj3MHhKNRPcgZD|faketoken';
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
      appId: '111856167337521',
      xfbml: true,
      version: 'v19.0',
    });
  }
}
