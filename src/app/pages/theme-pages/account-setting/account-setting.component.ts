import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { ConfirmedValidator } from '../../authentication/status/confrimedpassword';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
})
export class AppAccountSettingComponent implements OnInit {
  profileForm : FormGroup;
  userData    : any;
  user        : any;
  loginUserId : any;

  constructor(private fb:FormBuilder, private _ProfileService:ProfileService, private _Router:Router, private _AuthService:AuthService) {
    this.userData            = localStorage.getItem('userData');
    this.user                = JSON.parse(this.userData);
    this.loginUserId         = this.user?.client_user_id;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      client_user_phone: new FormControl('', [Validators.required]),
      newPassword      : new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword  : new FormControl('', [Validators.required]),
      // client_user_id  : new FormControl('',  [Validators.required]),
    },{
      validator: ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  
  );

  }

  UpdateProfileForm(e:Event){
    if(this.profileForm.invalid){ return }
    if(this.profileForm.valid){
    const filed = this.profileForm.value;
    var fd = new FormData();
    fd.append('password', filed.newPassword);
    fd.append('confirm_password', filed.confirmPassword);
    fd.append('client_user_phone', filed.client_user_phone);
    fd.append('client_user_id', this.loginUserId);
    this._ProfileService.UpdateProfile(fd).subscribe((res: any) => {
      if(res.status === "success"){
        this.logout();
        // Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, title: `Update Profile Successfully`, icon: 'success' });
        // this._Router.navigate(['/dashboards/dashboard1']);
      }
    }, (error:any) => {
      console.log(`Something rong.... ${error}`);
    });
   }
  }


  logout(){
    // e.preventDefault();
    if(this.loginUserId){
      var fd = new FormData();
      fd.append('login_user_id',this.loginUserId);
      this._AuthService.logoutFunction(fd).subscribe((res:any) => {
        console.log(res);
      })
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('userData');
      if (!localStorage.getItem('isLoggedin')) {
        this._Router.navigate(['/authentication/side-login']);
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, title: `Your Password was chnage Please login Again`, icon: 'success' });
      }
    }
  }

  get f() {
    return this.profileForm.controls;
  }

}
