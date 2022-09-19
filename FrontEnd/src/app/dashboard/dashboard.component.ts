import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService:DashboardService) { }

  welcomeText!:String;
  ngOnInit(): void {
    this.dashboardService.main().subscribe({
      next:(value)=> {
        this.welcomeText = value;
      },
      error:(err)=> {
        console.log(err);
      },
    })
  }

}
