import { Component, OnInit } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import { HomeService } from 'src/app/core/services/home.service';
import { policy } from 'src/assets/data/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public images = [
    { path: "https://cdn.hoanghamobile.com/i/home/Uploads/2022/10/31/iphone-13-webbbb-123.png"},
    { path: "https://cdn.hoanghamobile.com/i/home/Uploads/2022/11/18/1200x382-web.jpg"},
    { path: "https://cdn.hoanghamobile.com/i/home/Uploads/2022/11/15/landing-pre-order-v25-pro-1200x382.jpg"},
    { path: "https://cdn.hoanghamobile.com/i/home/Uploads/2022/11/11/huami-amazfit-gts-4-03.jpg"},
    { path: "https://cdn.hoanghamobile.com/i/home/Uploads/2022/11/09/tivi-xiaomi-1200x382.jpg"},
    { path: "https://cdn.hoanghamobile.com/i/home/Uploads/2022/11/19/msi-blackfriday-1200x382.jpg"}
  ]
  public policies = policy;
  public config: CountdownConfig = {
    leftTime: 30000,
    format: 'HH:mm:ss',
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `
          <div class="home-flash-header-timer-countdown-item">
            <div class="home-flash-header-timer-countdown-item-label">${v[0]}</div>
            <div class="home-flash-header-timer-countdown-item-label">${v[1]}</div>
          </div>
        `)
        .join(':');
    },
  };
  public listProducts = [];

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getListProducts().subscribe(res => {
      this.listProducts = res.items;
      console.log('product list', this.listProducts);
    })
  }

}
