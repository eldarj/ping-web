import {Inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {
  }

  public openSnackBar(message: string, btnLabel: string = '', duration: number = 5000) {
    this.snackbar.open(message, btnLabel, { duration });
  }
}
