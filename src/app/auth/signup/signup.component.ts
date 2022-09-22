import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  RctvSignupForm : FormGroup
  isLoading = false;

  constructor(
    private auth : AuthService,
    private router : Router,
    private _snackBar : MatSnackBar
    ) { }

  ngOnInit(): void {
    this.RctvSignupForm = new FormGroup({
      fullName : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, Validators.required),
      gender : new FormControl(null, Validators.required)
    })
  }

  onSubmitHandler(){
    this.isLoading = true;
    const {email, password} = this.RctvSignupForm.value;
   
    this.auth.signup(email, password)
      .subscribe(
        resp => {
          this.RctvSignupForm.reset();
          this.isLoading = false;
          console.log(resp)
          this.router.navigate(['home'])
        },
        err => {
          console.log(err)
          this.isLoading = false;
          this._snackBar.open(err, 'Dismiss');
        }
      )
  }

}
