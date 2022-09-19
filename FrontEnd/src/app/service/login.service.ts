import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface credential{
  username:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private http:HttpClient) { }

  baseUrl = "http://localhost:9000/";

  loginRequest(credentials:credential): Observable<any>
  {
    return this.http.post<any>(this.baseUrl+"authenticate",credentials);
  }

  setToken(token:string)
  {
    sessionStorage.setItem("token",token);
    return true;
  }

  isLoggedIn()
  {
    let token = sessionStorage.getItem("token");
    if(token==null||token=="")
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  isLogout()
  {
    sessionStorage.removeItem("token");
    return true;
  }

  getToken()
  {
    return sessionStorage.getItem("token");
  }

}
