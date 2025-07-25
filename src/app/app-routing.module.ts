import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { authGuard } from './guard/auth.guard';
import { notauthGuard } from './guard/notauth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateuserpasswordComponent } from './components/updateuserpassword/updateuserpassword.component';
import { EditUserinfoComponent } from './components/edit-userinfo/edit-userinfo.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingaddressComponent } from './components/shippingaddress/shippingaddress.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';



const routes: Routes = [ 
   { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'cart',canActivate: [authGuard], component: CartComponent },
  { path: 'wishlist',canActivate: [authGuard], component: WishlistComponent },
  { path: 'products',canActivate: [authGuard], component: ProductsComponent },
  { path: 'categories',canActivate: [authGuard], component: CategoriesComponent },
  { path: 'brands',canActivate: [authGuard], component: BrandsComponent },
   { path: 'profile',canActivate: [authGuard], component: ProfileComponent, children:[{path: 'update-password', component: UpdateuserpasswordComponent},{path: 'edit-userinfo', component:EditUserinfoComponent}] },
    { path: 'product-details/:id',canActivate: [authGuard], component: ProductDetailsComponent },
    { path: 'shippingaddress/:id/:type',canActivate: [authGuard], component: ShippingaddressComponent },
    { path: 'allorders',canActivate: [authGuard], component: OrdersComponent },

  { path: 'sign-up', canActivate: [notauthGuard], component: SignUpComponent },

  { path: 'login', canActivate: [notauthGuard], component: LoginComponent },
  { path: 'sign-out', component: SignOutComponent },
  { path: 'forget-password', canActivate: [notauthGuard], component: ForgetPasswordComponent },
  { path: 'verify-code', canActivate: [notauthGuard], component: VerifyCodeComponent },
  { path: 'reset-password',  component: ResetPasswordComponent },
  {path: '**', component:NotfoundpageComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{bindToComponentInputs:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
