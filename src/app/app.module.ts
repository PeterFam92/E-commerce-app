import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import{BrowserAnimationsModule}from'@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { ProductsComponent } from './components/products/products.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateuserpasswordComponent } from './components/updateuserpassword/updateuserpassword.component';
import { EditUserinfoComponent } from './components/edit-userinfo/edit-userinfo.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoriesSliderComponent } from './components/categories-slider/categories-slider.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { authInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    FooterComponent,
    ForgetPasswordComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NotfoundpageComponent,
    ProductsComponent,
    ResetPasswordComponent,
    SignOutComponent,
    SignUpComponent,
    VerifyCodeComponent,
    ProfileComponent,
    UpdateuserpasswordComponent,
    EditUserinfoComponent,
    ProductComponent,
    ProductDetailsComponent,
    CategoriesSliderComponent,
    MainSliderComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     ReactiveFormsModule,
     BrowserAnimationsModule,
     CarouselModule,
     NgxSpinnerModule,
     
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule { }
