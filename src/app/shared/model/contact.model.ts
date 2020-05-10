import {UserModel} from './user.model';

export class ContactModel {
  public id: string;

  public dialCodeAndPhoneNumber: string;
  public contactUser: UserModel;
  public contactName: string;
  public isFavorite: boolean;

  public addedTimestamp: string;

  public static newContact(dialCode: string, phoneNumber: string, contactName: string) {
    const contact = new ContactModel();
    contact.contactName = contactName;

    contact.contactUser = new UserModel();
    contact.dialCodeAndPhoneNumber = dialCode + phoneNumber;
    // contact.contactUser.phoneNumber = phoneNumber;
    // contact.contactUser.countryCode = CountryCodeModel.ofDialCode(dialCode);

    return contact;
  }
}
