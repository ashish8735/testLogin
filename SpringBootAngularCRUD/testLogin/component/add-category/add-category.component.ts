import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  CategoryForm: FormGroup;
  productForm:FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.CategoryForm = this.formBuilder.group({
      id: [],
      cname: ['', Validators.required],
    });

    // this.productForm = this.formBuilder.group({
    //   id: [],
    //   productname: ['', Validators.required],
    //   quantity: ['', Validators.required],
    //   price: ['', Validators.required],
    //   Category: ['', Validators.required],

    // });
  }

  onSubmit() { 
    this.apiService.createCategory(this.CategoryForm.value).subscribe(
        data => {
          console.log(data);
            alert('added successfully.');
            this.router.navigate(['manage']);
        },
        error => {
          alert(error);
        });
  }

}
 