import {CountryCodeModel} from './country-code.model';

export class UserModel {
  public id: string;
  public phoneNumber: string;
  public countryCode: CountryCodeModel;

  public firstName: string;
  public lastName: string;
  public avatarPath: string;
  public coverPath: string;
  public joinedTimestamp: string;
}
