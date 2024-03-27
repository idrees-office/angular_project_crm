
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RouterModule, Route, ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ConfirmedValidator } from '../status/confrimedpassword';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-side-reset-password',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './app-side-reset-password.component.html',
})

export class AppSideResetPasswordComponent implements OnInit {
  ResetPasswordForm : FormGroup;
  Email:any;
  constructor(private fb:FormBuilder, private _ActivatedRoute:ActivatedRoute, private _ProfileService:ProfileService, private _Router:Router){ }

  ngOnInit(): void {  
    const paramMap = this._ActivatedRoute.snapshot.paramMap;
    this.Email = paramMap.get('email');

    console.log(this.Email);
    

    this.ResetPasswordForm = this.fb.group({
      password            : new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password    : new FormControl('', [Validators.required]),
    },{
      validator: ConfirmedValidator('password', 'confirm_password'),
    });
  }
  
  get f() { return this.ResetPasswordForm.controls; }

  submit() {
    if(this.ResetPasswordForm.invalid){
      return
    }
    if(this.ResetPasswordForm.valid){
      const filed = this.ResetPasswordForm.value;
      var fd = new FormData();
      if(this.Email !== ''){
        fd.append('client_user_email',this.Email);
        fd.append('password',filed.password);
        fd.append('confirm_password',filed.confirm_password);
        this._ProfileService.UpdatePassword(fd).subscribe((res:any) => {
          if(res.status == 'success' || res.status === 'success'){
            Swal.fire({
              text: "Reset Your Password Successfully",
              icon: "success"
            });
            this.ResetPasswordForm.reset();
            this._Router.navigate(['/authentication/side-login']);
          }else{
            Swal.fire({
              text: "Please enter the correct password",
              icon: "error"
            });
          }
        });
      }else{
          console.log('Can Not find Any Email');       
      }
    }
  }
}
