import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
  ],
  providers: []
})
export class MaterialModule {
}
