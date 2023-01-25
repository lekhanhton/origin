import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'origin';

  constructor(
    private translate: TranslateService,
    private i18n: NzI18nService,
  ) {
    const language = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    switch (language) {
      case 'en':
        this.i18n.setLocale(en_US);
        break;
      default:
        this.i18n.setLocale(vi_VN);
    }
  }
}
