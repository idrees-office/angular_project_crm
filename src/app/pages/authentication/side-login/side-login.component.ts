import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  options = this.settings.getOptions();
  loginForm: FormGroup;
  returnUrl: any;
  constructor(
    private settings: CoreService,
    private router: Router,
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private userservice: UserService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl =
      this.ActivatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.fb.group({
      client_user_email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login(e: Event) {
    e.preventDefault();
    if (this.loginForm.valid) {
      let fd = this.loginForm.value;
      this._AuthService.login(fd).subscribe((res: any) => {
        if (res.status == 'login') {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: 'Login Successfully',
            icon: 'success',
          });
          localStorage.setItem('userData', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);
          this.loginForm.reset();
          localStorage.setItem('isLoggedin', 'true');
          if (localStorage.getItem('isLoggedin')) {
            this.router.navigate([this.returnUrl]);
          }
        } else if (res.status == 'false') {
          Swal.fire('Invalid Username And Password ', '', 'error');
          this.loginForm.reset();
        } else {
          Swal.fire('Invalid Username And Password', '', 'error');
        }
      });
    } else {
      Swal.fire('Opps.....', '', 'error');
    }
  }
}
