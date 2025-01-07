import { MasterService } from './services/master.service';
import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIResponseModel, Customer, LoginModel } from './model/Product';
import { FormsModule } from '@angular/forms';
import { Constant } from './constant/constant';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'BigBasket';
  registerObj: Customer = new Customer();
  loginObj: LoginModel = new LoginModel();
  loggedUserData: Customer = new Customer();



  masterService  = inject(MasterService);

  ngOnInit(): void {
      const isUser = localStorage.getItem(Constant.LOCAL_KEY)
      if(isUser != null){
        const parseObj = JSON.parse(isUser)
        this.loggedUserData = parseObj;

      }
  }

  @ViewChild("registerModel") registerModel: ElementRef | undefined;
  @ViewChild("loginModel") loginModel: ElementRef | undefined;

  openLoginModel(){
    if(this.loginModel)
    {
      this.loginModel.nativeElement.style.display ="block"
    }
  }

  closeLoginModel(){
    if(this.loginModel)
    {
      this.loginModel.nativeElement.style.display ="none"
    }
  }



  openRegisterModel(){
    if(this.registerModel)
    {
      this.registerModel.nativeElement.style.display ="block"
    }
  }

  closeRegisterModel(){
    if(this.registerModel)
    {
      this.registerModel.nativeElement.style.display ="none"
    }
  }

  onRegister(){
    // debugger;
    this.masterService.registerNewCustomer(this.registerObj).subscribe((res:APIResponseModel)=>{
      if(res.result){
        alert("Registration Success")
        this.closeRegisterModel()
      }else {
        alert(res.message);
      }
    })
  }

  onLogin(){
    // debugger;
    this.masterService.onLogin(this.loginObj).subscribe((res:APIResponseModel)=>{
      if(res.result){
        this.loggedUserData = res.data;
        localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(res.data) )
        this.closeLoginModel()

      } else {
        alert(res.message);
        console.log('say something'+ res.message)

      }
    })
  }
  logOff(){
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.loggedUserData = new Customer();
  }
}
