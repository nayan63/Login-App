import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  baseUrl = "http://localhost:9000/";

  main():Observable<any>
  {
    return this.http.get(`${this.baseUrl}dashboard`,{responseType:'text'});
  }
}