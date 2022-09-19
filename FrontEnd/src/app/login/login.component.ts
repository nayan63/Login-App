import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { credential, LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private appComponent:AppComponent) { }

  hide: boolean = true;
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      "username": [null, [Validators.required]],
      "password": [null, [Validators.required]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginSubmit() {
    this.loginService.loginRequest(this.loginForm.value).subscribe({
      next: (response) => {
        this.loginService.setToken(response.token);
        this.appComponent.ngOnInit();
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


}
