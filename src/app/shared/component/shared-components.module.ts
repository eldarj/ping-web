import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../module/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    NavigationBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    NavigationBarComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedComponentsModule { }
