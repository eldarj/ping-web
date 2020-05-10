import {Component, OnInit} from '@angular/core';
import {CountryCodeModel} from '../../../shared/model/country-code.model';
import {finalize} from 'rxjs/operators';
import {CountryCodeService} from '../../../service/country-code.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../service/authentication.service';
import {Router} from '@angular/router';
import {SnackbarService} from '../../../service/snackbar.service';
import {LoginResponseModel} from '../../../shared/model/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  public formLoading = true;
  public submitLoading = true;
  public countryCodes: CountryCodeModel[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackbarService: SnackbarService,
              private countryCodesService: CountryCodeService,
              private authenticationService: AuthenticationService) {
    this.form = this.fb.group({
      dialCode: ['387', Validators.required],
      phoneNumber: ['62005152', Validators.required],
    });
  }

  ngOnInit(): void {
    this.countryCodesService.getCountryCodes()
      .pipe(finalize(() => setTimeout(() => {
        this.formLoading = false;
      }, 1000)))
      .subscribe(codes => this.countryCodes = codes);
  }

  public onSubmit() {
    this.submitLoading = true;
    this.authenticationService.authenticate(this.form.value.dialCode, this.form.value.phoneNumber)
      .pipe(finalize(() => this.submitLoading = false))
      .subscribe(
        (loginResponse: LoginResponseModel) => {
          let snackMsg = 'Successfully logged in.';
          if (loginResponse.verified === true) {
            this.router.navigate(['/profile']);
          } else {
            snackMsg = 'SMS PIN code sent, please use that code to verify your phone number.';
            this.router.navigate(['/get-started/verification']);
          }

          this.snackbarService.openSnackBar(snackMsg);
        },
        error => {
          console.log(error);
          this.snackbarService.openSnackBar('Something went wrong, please try again.');
        }
      );
  }
}
