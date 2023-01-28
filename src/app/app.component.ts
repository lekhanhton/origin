import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { LOCALSTORAGE_KEY } from './_common/constants/local-storage.constant';
import * as countryTimezone from 'countries-and-timezones';
import { COUNTRY_CURRENCY_DATA } from './_common/constants/country-currency-data.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  language: string = 'en';
  timezoneName: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  countries: countryTimezone.Country[] = countryTimezone.getCountriesForTimezone(this.timezoneName);

  constructor(private translate: TranslateService, private i18n: NzI18nService) {
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
    this.i18n.setLocale(en_US);
    const countryCurrency = COUNTRY_CURRENCY_DATA.find((e) => e.countryCode === this.countries[0].id);
    localStorage.setItem(LOCALSTORAGE_KEY.COUNTRY_CURRENCY, JSON.stringify(countryCurrency));
  }
}
