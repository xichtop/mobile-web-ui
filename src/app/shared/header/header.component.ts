import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  selectedLanguage = 'vn';
  isSearch = false;

  constructor(
    private translateService: TranslateService,
  ) {}

  changeLanguage(event: string) {
    this.selectedLanguage = event;
    this.translateService.use(event);
  }

  showModalSearch() {
    this.isSearch = true;
  }


  cancelSearch(): void {
    this.isSearch = false;
  }
}
