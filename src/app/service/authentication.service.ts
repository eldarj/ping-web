import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {error} from 'util';
import {CookieService} from 'ngx-cookie-service';
import {LoginResponseModel} from '../shared/model/login-response.model';
import {UserModel} from '../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static TOKEN_CACHE_KEY = 'token';
  private static PRINCIPAL_CACHE_KEY = 'principal';
  private static ENDPOINT = 'http://localhost:8089/api/authenticate';

  private user: UserModel = null;
  private principal: string = null;
  private token: string = null;

  constructor(private cookieService: CookieService, private httpClient: HttpClient) {
  }

  public canActivateVerification(): boolean {
    return this.user !== null;
  }

  public getPrincipal() {
    if (this.principal !== null) {
      return this.principal;
    } else {
      return this.cookieService.get(AuthenticationService.PRINCIPAL_CACHE_KEY);
    }
  }

  public getToken() {
    if (this.token !== null) {
      return this.token;
    } else {
      return this.cookieService.get(AuthenticationService.TOKEN_CACHE_KEY);
    }
  }

  public authenticate(dialCode, phoneNumber): Observable<any> {
    const headers = {'X-PING-DIAL-CODE': dialCode, 'X-PING-PHONE-NUMBER': phoneNumber};
    return this.httpClient.post(AuthenticationService.ENDPOINT, {}, {headers, observe: 'response'})
      .pipe(map((response: any) => {
        if (response.body !== null && response.body.success === true) {
          this.user = response.body.userDto;
          return LoginResponseModel.createUnverifiedLogin(this.user);
        }

        throw error();
      }));
  }

  public verify(twoWayPin) {
    const headers = {
      'X-PING-DIAL-CODE': this.user.countryCode.dialCode,
      'X-PING-PHONE-NUMBER': this.user.phoneNumber,
      'X-PING-TWO-WAY-PIN': twoWayPin
    };

    return this.httpClient.post(AuthenticationService.ENDPOINT, {}, {headers, observe: 'response'})
      .pipe(map((response: any) => {
        if (response.body !== null && response.body.success === true && response.body.verified) {
          this.token = response.headers.get('authorization');
          this.cookieService.set(AuthenticationService.TOKEN_CACHE_KEY, this.token.replace('Bearer ', ''), 30);
          this.cookieService.set(AuthenticationService.PRINCIPAL_CACHE_KEY,
            this.user.countryCode.dialCode + this.user.phoneNumber, 30);

          return LoginResponseModel.createSuccessfulLogin(null, this.token);
        }
      }));
  }
}
