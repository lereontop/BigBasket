import { map, Observable, Subscription } from 'rxjs';
import { APIResponseModel, CartModel, Category, Customer, ProductList } from './../../model/Product';
import { MasterService } from './../../services/master.service';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  //Old Way
  // productList: Product[] = [];
  productList = signal<ProductList[]>([]);


  categoryList: Observable<Category[]> = new Observable<Category[]>()
  subscriptionList: Subscription[] = [];
  loggedUserData:Customer = new Customer()

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList = this.masterService.getAllCategory().pipe(
      map(product => product.data)
    )
  }
  constructor() {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY)
    if (isUser != null) {
      const parseObj = JSON.parse(isUser)
      this.loggedUserData = parseObj;

    }
  }

  getAllProductByCategoryId(id: number) {
    this.masterService.getAllProductsByCategoryId(id).subscribe((res: APIResponseModel) => {
      this.productList.set(res.data);

    })

  }
  loadAllProducts() {
    this.subscriptionList.push(this.masterService.getAllProducts().subscribe((res: APIResponseModel) => {
      this.productList.set(res.data);

    }))
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach(element => {
      element.unsubscribe();

    });
  }


  onAddToCart(id: number) {
    const cartObj: CartModel = new CartModel()
    cartObj.ProductId = id
    cartObj.CustId = this.loggedUserData.custId
    this.masterService.AddToCart(cartObj).subscribe((res:APIResponseModel)=>{
      if(res.result){
        alert('product Added to Cart')
        console.log(res.data)

      }else {
        alert(res.message)
      }
    })

  }

}
