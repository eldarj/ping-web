import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TimeUtil} from '../util/time.util';
import {CountryCodeModel} from '../shared/model/country-code.model';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {
  private static COUNTRY_CODES_CACHE_KEY = 'countryCodesCacheKey';
  private static COUNTRY_CODES_CACHE_EXPIRATION_KEY = 'countryCodesCacheExpirationKey';
  private static COUNTRY_CODES_ENDPOINT = 'http://localhost:8089/api/country-codes';

  private countryCodes: CountryCodeModel[] = null;

  constructor(private httpClient: HttpClient) {
  }

  public getCountryCodes(): Observable<any> {
    if (this.countryCodes !== null) {
      return of(this.countryCodes);
    }
    const cachedCodes = localStorage.getItem(CountryCodeService.COUNTRY_CODES_CACHE_KEY);
    const expirationTimestamp = Number(localStorage.getItem(CountryCodeService.COUNTRY_CODES_CACHE_EXPIRATION_KEY));

    if (cachedCodes !== null && expirationTimestamp > Date.now()) {
      return of(JSON.parse(cachedCodes));
    }

    return this.loadFromApi();
  }

  private loadFromApi(): Observable<any> {
    return this.httpClient.get(CountryCodeService.COUNTRY_CODES_ENDPOINT).pipe(
      map(
        (countryCodes: CountryCodeModel[]) => {
          this.countryCodes = CountryCodeModel.map(countryCodes);

          localStorage.setItem(CountryCodeService.COUNTRY_CODES_CACHE_KEY, JSON.stringify(this.countryCodes));
          localStorage.setItem(CountryCodeService.COUNTRY_CODES_CACHE_EXPIRATION_KEY,
            String(Date.now() + TimeUtil.DAY_IN_MILLISECONDS));

          return this.countryCodes;
        },
        (error) => console.error(error)
      )
    );
  }
}
