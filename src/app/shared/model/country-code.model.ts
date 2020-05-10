export class CountryCodeModel {
  public dialCode: string;
  public countryName: string;
  public isoCode3: string;
  public label: string;

  public static ofAll(dialCode: string, countryName: string, isoCode3: string) {
    const cc = new CountryCodeModel();
    cc.dialCode = dialCode;
    cc.countryName = countryName;
    cc.isoCode3 = isoCode3;
    cc.label = `${dialCode} - ${countryName} (${isoCode3})`;

    return cc;
  }

  public static ofDialCode(dialCode: string) {
    const cc = new CountryCodeModel();
    cc.dialCode = dialCode;

    return cc;
  }

  public static map(countryCodes: CountryCodeModel[]): CountryCodeModel[] {
    return countryCodes.map(cc => {
      return CountryCodeModel.ofAll(cc.dialCode, cc.countryName, cc.isoCode3);
    });
  }
}
