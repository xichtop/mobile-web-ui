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
        'https://shopdunk.com/images/uploaded/LINH%20CHERRYYYYYYY/danh%20m%E1%BB%A5c%20iphone%20ipad%20t7-10.jpg',
    },
    {
      id: 3,
      urlPicture:
        'https://shopdunk.com/images/uploaded/LINH%20CHERRYYYYYYY/Danh%20m%E1%BB%A5c%20PC.jpg',
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
    // this.route.params.subscribe((params: Params) => {
    //   const type = params['type'];
    //   if (type) {
    //     this.getProductList(type);
    //   } else {
    //     this.getProductList(this.currentType);
    //   }
    // });

    this.route.queryParamMap
      .pipe(map(params => params.get('type') || ''))
      .subscribe(params => {
        if (params) {
          this.getProductList(params);
        } else {
          this.getProductList('all');
        }
      });

  }

  getProductList(type: string) {
    this.commonService.changeLoadingStatus(true);
    this.currentType = type;
    if (this.currentType === 'all') {
      // const params = `limit=${this.currentSize}&page=${this.currentPage}`;
      const params = {
        limit: this.currentSize,
        page: this.currentPage
      }
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
            // const params = `limit=${this.currentSize}&page=${this.currentPage}&category=${data}`;
            const params = {
              limit: this.currentSize,
              page: this.currentPage,
              category: data
            }
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
