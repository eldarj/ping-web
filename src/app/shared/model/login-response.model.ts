import {UserModel} from './user.model';

export class LoginResponseModel {
  public token: string;
  public user: UserModel;
  public verified: boolean;

  public success: boolean;

  static createUnverifiedLogin(user: UserModel): LoginResponseModel {
    const loginResponse = new LoginResponseModel();
    loginResponse.user = user;
    loginResponse.success = true;
    loginResponse.verified = false;

    return loginResponse;
  }

  static createSuccessfulLogin(user: UserModel, token: string): LoginResponseModel {
    const loginResponse = new LoginResponseModel();
    loginResponse.user = user;
    loginResponse.success = true;
    loginResponse.verified = true;
    loginResponse.token = token;

    return loginResponse;
  }
}
