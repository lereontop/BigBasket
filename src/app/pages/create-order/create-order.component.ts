import { Component, inject, Inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponseModel, CartData, OrderModel } from '../../model/Product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  imports: [FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent  implements OnInit{

  masterService = inject(MasterService);

  cartData: CartData[] =[]
  totalAmount =0;
  orderObj:OrderModel = new OrderModel();

  ngOnInit(): void {
    this.getCartItem();

  }
   getCartItem(){
      this.masterService.getCartProductsByCustomerId(this.masterService.loggedUserData.custId ).subscribe((res:APIResponseModel)=>{
        this.cartData = res.data;
        this.cartData.forEach(element => {
          this.totalAmount = this.totalAmount + element.productPrice

        });
      })

    }
    placeOrder(){
      this.orderObj.CustId = this.masterService.loggedUserData.custId;
      this.orderObj.TotalInvoiceAmount = this.totalAmount;
      this.masterService.onPlaceOrder(this.orderObj).subscribe((res:APIResponseModel)=>{
        if(res.result){
          alert('Order placed successfully');
          this.getCartItem()
          this.orderObj = new OrderModel();
        } else {
          alert(res.message)
        }
      })

    }


}
