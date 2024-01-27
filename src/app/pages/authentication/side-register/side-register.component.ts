import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { ConfirmedValidator } from '../status/confrimedpassword';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent  implements OnInit{
  options = this.settings.getOptions();
  rgisterForm:FormGroup;

  constructor(private settings: CoreService, private router: Router, private fb:FormBuilder, private auth:AuthService) {}

  ngOnInit(): void {

    this.rgisterForm = this.fb.group({
      client_user_name : new FormControl('', [ Validators.required, Validators.minLength(6)]),
      client_user_email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    },{
      validator: ConfirmedValidator('password', 'confirm_password'),
    }
  );
  }
  
  get f() {
    return this.rgisterForm.controls;
  }


 create(event: any) {
    if (this.rgisterForm.invalid) {
      return;
    }
    let fd = this.rgisterForm.value;
    let email = fd.client_user_email;
    this.auth.register(fd).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, title: 'Register Successfully', icon: 'success',
        });
        this.rgisterForm.reset();
        this.router.navigate(['/authentication/side-login']);
      } else if (res.status == 'false') {
        Swal.fire('Opps.....', '', 'error');
        this.rgisterForm.reset();
      } else {
        Swal.fire('Opps.....', '', 'error');
      }
    });
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboards/dashboard1']);
  }
}




