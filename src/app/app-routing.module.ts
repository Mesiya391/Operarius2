import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from  './login/login.component';
import { LoginGuard } from  './login/login.guard';
import { InternalGuard } from  './login/guard/internal.guard';
import { HeaderComponent } from './header/header.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { AddOfferComponent } from './offers/add-offer/add-offer.component';
import { EditOfferComponent } from './offers/edit-offer/edit-offer.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component'

import { FaqComponent} from './faq/faq.component';
import { AboutComponent} from './about/about.component';
import { HomePageComponent } from './home-page/home-page.component';

import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {
    path:  '',
    redirectTo: '/login', pathMatch: 'full'
  },
  { path: 'add-offer', component: AddOfferComponent, canActivate: [LoginGuard] },
  { path: 'edit-offer/:id', component: EditOfferComponent, canActivate: [LoginGuard] },
  { path: 'offers-list', component: OfferListComponent },
      {
        path: 'header',
        redirectTo: '/home', pathMatch: 'full'
      },
      {
        path: 'navbar',
        component: NavbarComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'home',
        component: HomePageComponent,
        canActivate: [LoginGuard]
      },
    {
        path: 'place-order',
        component: PlaceOrderComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'faq',
        component: FaqComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'about',
        component: AboutComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'profile',
        component: HeaderComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [InternalGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [InternalGuard]
    },
    {
        path: 'verify-email',
        component: VerifyEmailComponent,
        canActivate: [InternalGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [InternalGuard]
    }
    ,
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
