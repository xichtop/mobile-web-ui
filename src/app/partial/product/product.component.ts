import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, concatMap, forkJoin, map, switchMap } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  arrayCarousel = [
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
  ];

  totalItems = 0;
  currentType = 'all';
  currentPage = 1;
  currentSize = 8;
  currentList: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    // private productService: ProductService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const type = params['type'];
      if (type) {
        this.getProductList(type);
      } else {
        this.getProductList(this.currentType);
      }
    });


  }

  getProductList(type: string) {
    this.commonService.changeLoadingStatus(true);
    this.currentType = type;
    if (this.currentType === 'all' || this.currentType === 'product') {
      const params = `limit=${this.currentSize}&page=${this.currentPage}`;
      this.commonService.getProducts(params).subscribe((data) => {
        this.totalItems = data.length;
        this.currentList = data.data;
        this.commonService.changeLoadingStatus(false);
      });
    } else {
      const category$ = this.commonService.getCategoryBySortCode(
        this.currentType
      );
      category$
        .pipe(
          map((res) => res.data._id),
          switchMap((data) => {
            const params = `limit=${this.currentSize}&page=${this.currentPage}&category=${data}`;
            return this.commonService.getProducts(params);
          })
        )
        .subscribe((data) => {
          this.totalItems = data.length;
          this.currentList = data.data;
          this.commonService.changeLoadingStatus(false);
        });
    }
  }

  changePaginate(event: number) {
    this.currentPage = event;
    this.getProductList(this.currentType);
  }

  changeSize(event: number) {
    this.currentSize = event;
    this.getProductList(this.currentType);
  }
}
