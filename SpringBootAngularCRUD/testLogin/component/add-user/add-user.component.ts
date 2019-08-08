import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;
  msg:any;
user:any;
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required],
      role: ['', Validators.required] 
    });

  }
  onSubmit() {
    this.apiService.createUser(this.addForm.value)
      .subscribe( data => {
        this.user=data;
        console.log(data);
        //this.router.navigate(['list']);
        if(this.user.id)
        this.msg="registered Sucessfully";        
          
      });
 
  }

}
