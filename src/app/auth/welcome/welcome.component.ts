import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('templateDrivenLoginForm') loginForm : NgForm
  isLoading = false;

  constructor(
    private auth : AuthService,
    private router : Router,
    private _snackBar : MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  onSubmitHandler(){
    this.isLoading = true;
    const {email, password} = this.loginForm.value
    this.auth.signin(email, password)
      .subscribe(
        resp => {
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
          this._snackBar.open(err, 'Dismiss');
        })
  }

}
