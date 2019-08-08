import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'] 
})
export class ListUserComponent implements OnInit {
list:any;
navigationExtras:{queryParams:{id:any;};};
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.getlist(); 
    //this.apiService.getUsers();
  }
getlist(){
  this.apiService. getUsers().subscribe(data => {
    this.list=data;
    console.log(this.list);

  });
}
updateEmployee(user): void{
sessionStorage.setItem("updateid",user.id);

this.router.navigate(['/update'])
}
deleteUser(user):void{
  this.apiService. deleteUser(user.id).subscribe(data => {
    console.log(data);
    this.ngOnInit();

  });
}
}
