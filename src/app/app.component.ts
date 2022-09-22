import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isAuth = false;
  title = 'ux-keep-notes';

  constructor(private auth : AuthService){

  }

  ngOnInit(): void {
    this.auth.autoLogin()
    this.auth.user.subscribe(respUser => {
      if(respUser){
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }
    });
  }

  onLogout(){
    this.auth.logout();
  }

  
}
