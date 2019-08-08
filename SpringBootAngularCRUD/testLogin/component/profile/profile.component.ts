import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
list:any;
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.getprofile();
  }
getprofile(){
  let userId=sessionStorage.getItem("id");
    this.apiService.getUserById(+userId)
    .subscribe( data => {
      console.log(data);
      this.list=data; 
    }); 
}
}
 