import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  nam:any;
  constructor(private serviceapi:ApiService) { }

  ngOnInit() {
this.serviceapi.test().subscribe(res=>{
  console.log()
})
    let name=sessionStorage.getItem("user");
    this.nam=name;
  }

} 
