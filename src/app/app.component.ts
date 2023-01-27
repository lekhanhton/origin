import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  language: string = 'en';

  constructor(
    private translate: TranslateService,
    private i18n: NzI18nService,
  ) {
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
    this.i18n.setLocale(en_US);
  }
}
