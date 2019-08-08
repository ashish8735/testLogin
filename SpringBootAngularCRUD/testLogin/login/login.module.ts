import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {routing} from './login.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    NgxUiLoaderModule
  ]
})
export class LoginModule { }
