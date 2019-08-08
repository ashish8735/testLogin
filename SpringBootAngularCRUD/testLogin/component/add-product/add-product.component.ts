import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  CategoryForm: FormGroup;
  productForm:FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    
    this.productForm = this.formBuilder.group({
      id: [],
      productname: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      file: ['', Validators.required],
      Category: ['', Validators.required],

    });
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