import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let userId =sessionStorage.getItem("updateid");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required],
      rol: ['', Validators.required]

    });
    this.apiService.getUserById(+userId)
      .subscribe( data => {
        console.log(data);
        this.editForm.setValue(data);
      });
  }
  
  onSubmit() { 
    this.apiService.updateUser(this.editForm.value).subscribe(
        data => {
            alert('User updated successfully.');
            this.router.navigate(['list']);
        },
        error => {
          alert(error);
        });
  }

}

