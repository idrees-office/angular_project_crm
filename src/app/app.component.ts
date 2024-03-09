import { Component, OnInit } from '@angular/core';

declare const FB: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Evernest Real Estate';

  ngOnInit(): void {
    // this.initFacebookSdk();

    // console.log('data');

    // FB.api('/me', { fields: 'last_name' }, function (response: any) {

    //   console.log('xyz')

    //   console.log(response);
    // });


  }

  // initFacebookSdk(): void {
  //   FB.init({
  //     appId: '1067623880812441',
  //     autoLogAppEvents: true,
  //     xfbml: true,
  //     version: 'v12.0',
  //   });


   

     
  // }
}
