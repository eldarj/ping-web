import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryCodeService} from '../../../../service/country-code.service';
import {CountryCodeModel} from '../../../../shared/model/country-code.model';
import {finalize} from 'rxjs/operators';
import {ContactService} from '../../../../service/contact.service';
import {SnackbarService} from '../../../../service/snackbar.service';
import {ContactModel} from '../../../../shared/model/contact.model';

@Component({
  selector: 'app-new-contact',
  templateUrl: './add-new-contact.component.html',
})
export class AddNewContactComponent implements OnInit {
  public form: FormGroup;

  public formLoading = true;
  public submitLoading = false;
  public countryCodes: CountryCodeModel[] = [];

  constructor(private fb: FormBuilder,
              private snackbarService: SnackbarService,
              private countryCodesService: CountryCodeService,
              private contactService: ContactService) {
    this.form = this.fb.group({
      dialCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      contactName: ['', Validators.required],
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
    const contact = ContactModel.newContact(this.form.value.dialCode,
      this.form.value.phoneNumber,
      this.form.value.contactName);


    this.contactService.addContact(contact)
      .pipe(finalize(() => this.submitLoading = false))
      .subscribe(
        (response: any) => {
          if (response.content !== null) {
            this.snackbarService.openSnackBar('Successfully added a contact!');
          } else {
            this.newContactErrorHandler();
          }
        },
        (error) => {
          this.newContactErrorHandler();
        }
      );
  }

  private newContactErrorHandler() {
    this.snackbarService.openSnackBar('Something went wrong, please try again.');
  }
}
