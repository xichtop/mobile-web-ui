import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, concatAll, concatMap, from, map } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  arrayCarousel = [
    // {
    //   id: 1,
    //   urlPicture:
    //     'https://shopdunk.com/images/uploaded/banner/Danh%20m%E1%BB%A5c%20(4).jpg',
    // },
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

  topProduct$ = new Observable<Product[]>();
  categories = [{
    _id: '',
    sortCode: '',
    urlPicture: '',
    products: []
  }];

  constructor (
    private http: HttpClient,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    const categories$ = this.commonService.getCategories();
    categories$
      .pipe(
        concatMap(res => {
          this.categories = res.data;
          return from(res.data)
        }),
        map(data => data['_id'])
      )
      .subscribe(data => {
        this.commonService.getProductsByCategory(data, 4).subscribe(ress => {
          const index = this.categories.findIndex(item => item._id === data);
          // this.categories[index].products = ress as Array<never>;
          Object.assign(this.categories[index], {products: ress})
          console.log(ress);
          console.log(this.categories);
        })
    })

    this.topProduct$ = this.commonService.getProducts('limit=4');
  }
}
