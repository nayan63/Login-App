import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FrontEnd';
  buttonLogin:boolean=false;

  constructor(private loginService:LoginService,private router:Router){}
  ngOnInit(): void {
    this.buttonLogin = this.loginService.isLoggedIn();
  }

  logout()
  {
    this.loginService.isLogout(); 
    this.buttonLogin = this.loginService.isLoggedIn();
    this.router.navigate(['login']);
  }

  
}
