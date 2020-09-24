import { Component, OnInit } from '@angular/core';
import { RegisterPayload } from '../register-payload';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

   this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });

  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;
    this.authService.register(this.registerPayload).subscribe(data => {
      console.log('register success');
      this.router.navigateByUrl('/register-success');
      },
      error => {
      console.log('Register failed');
    });
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  get f() { return this.registerForm.controls; }
}
