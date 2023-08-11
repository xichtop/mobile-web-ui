import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  arrayCarousel = [
    {
      id: 1,
      urlPicture:
        'https://shopdunk.com/images/uploaded/banner/Banner%20th%C3%A1ng%208/banner%20apple%20pay_Banner%20PC.jpg',
    },
    {
      id: 2,
      urlPicture:
        'https://shopdunk.com/images/uploaded/banner/Banner%20th%C3%A1ng%208/banner%20ipad%20gen%209%20t8_Banner%20PC.jpg',
    },
    {
      id: 3,
      urlPicture:
        'https://shopdunk.com/images/uploaded/banner/Banner%20th%C3%A1ng%208/banner%20macbook%20air%20t8_Banner%20PC.jpg',
    },
    {
      id: 4,
      urlPicture:
        'https://shopdunk.com/images/uploaded/banner/Banner%20th%C3%A1ng%208/banner%20watch%20t8_Banner%20PC.jpg',
    },
    {
      id: 5,
      urlPicture:
        'https://shopdunk.com/images/uploaded/banner/Banner%20th%C3%A1ng%208/banner%20iphone%2014%20Pro%20Max%20T8_Banner%20PC.jpg',
    },
  ];

  products = [
    {
      title: 'Iphone 14 Promax',
      rate: 4,
      img: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
    },
    {
      title: 'Iphone 15 Pro',
      rate: 4.5,
      img: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
    },
    {
      title: 'Iphone 16 Promax',
      rate: 3.5,
      img: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
    },
    {
      title: 'Iphone 17 Promax',
      rate: 5,
      img: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
    }
  ];
}
