import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {CountryCodeService} from '../../../service/country-code.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../service/authentication.service';
import {Router} from '@angular/router';
import {SnackbarService} from '../../../service/snackbar.service';
import {LoginResponseModel} from '../../../shared/model/login-response.model';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent {
  public form: FormGroup;

  public formLoading = true;
  public submitLoading = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService,
    private countryCodesService: CountryCodeService,
    private authenticationService: AuthenticationService,
  ) {
    this.form = this.fb.group({
      twoWayPin: ['', Validators.required],
    });
  }

  public onSubmit() {
    this.submitLoading = true;

    this.authenticationService.verify(this.form.value.twoWayPin)
      .pipe(finalize(() => this.submitLoading = false))
      .subscribe(
        (loginResponse: LoginResponseModel) => {
          if (loginResponse.verified === true) {
            this.snackbarService.openSnackBar('Successfully logged in.');
            this.router.navigate(['/profile']);
          }
        },
        error => {
          this.snackbarService.openSnackBar('Please check if you entered the correct PIN code, that we\'ve sent you.' +
            'Would you like to enter your phone number again?', 'Yes, take me back');
        }
      );
  }
}
