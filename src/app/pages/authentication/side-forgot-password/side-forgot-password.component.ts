import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-forgot-password',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './side-forgot-password.component.html',
})
export class AppSideForgotPasswordComponent implements OnInit {
  options            = this.settings.getOptions();
  RequireEmialForget : FormGroup;
  constructor(private settings: CoreService, private router: Router, private fb:FormBuilder, private _AuthService:AuthService) {}
  ngOnInit(): void {
    this.RequireEmialForget = this.fb.group({
      client_user_email: new FormControl('', [Validators.required]),
    })
  }

  get f() { return this.RequireEmialForget.controls; }
  submit() {
      if(this.RequireEmialForget.invalid){ return }
      if(this.RequireEmialForget.valid){
        var filed = this.RequireEmialForget.value;
        var fd = new FormData();
        fd.append('client_user_email',filed.client_user_email);
        this._AuthService.sendResetLink(fd).subscribe((res:any) => {
          if(res.status == 'success' || res.status === 'success'){
            Swal.fire({
              text: "Please Check Your Email, Password Reset link is your Email",
              icon: "success"
            });
            this.RequireEmialForget.reset();
          }
          if(res.status == 'error' || res.status === 'error'){
            Swal.fire({
              text: "Please enter the correct email. This email cannot be found in our records.",
              icon: "error"
            });
            this.RequireEmialForget.reset();
          }
        }, (error:any) =>{
          if(error.status == '404' || error.status === '404'){
            Swal.fire({
              text: "Please enter the correct email. This email cannot be found in our records.",
              icon: "error"
            });
            this.RequireEmialForget.reset();
          }
        })
      }
  }

}
