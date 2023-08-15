import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  selectedLanguage = 'vn';
  isSearch = false;
  isLogin = false;

  constructor(
    private translateService: TranslateService,
    private homeService: HomeService
  ) { }

  changeLanguage(event: string): void {
    this.selectedLanguage = event;
    this.translateService.use(event);
  }

  showModalSearch(): void {
    this.isSearch = true;
  }

  cancelSearch(): void {
    this.isSearch = false;
  }

  showLogin(): void {
  
  }

}
