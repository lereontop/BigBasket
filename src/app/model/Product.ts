export interface APIResponseModel {
  message: string,
  result: boolean,
  data: any
}
export class Customer {
  custId: number
  name: string
  MobileNo: string
  Password: string
  constructor() {
    this.custId = 0
    this.name = ''
    this.MobileNo = ''
    this.Password = ''
  }
}

export class CartModel {
  CartId: number
  CustId: number
  ProductId: number
  Quantity: number
  AddedDate: Date
  constructor() {
    this.CartId = 0
    this.CustId = 0
    this.ProductId = 0
    this.Quantity = 1
    this.AddedDate = new Date
  }
}




export class LoginModel {
  UserName: string
  UserPassword: string
  constructor() {
    this.UserName = '';
    this.UserPassword = '';
  }
}

export interface ProductList {
  productId: number
  productSku: string
  productName: string
  productPrice: number
  productShortName: string
  productDescription: string
  createdDate: string
  deliveryTimeSpan: string
  categoryId: number
  productImageUrl: string
  categoryName: string

}

export interface Category {
  categoryId: number
  categoryName: string
  parentCategoryId: number
  userId: number
}
