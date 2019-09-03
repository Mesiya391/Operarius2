import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from  './login/login.component';
import { AppComponent } from './app.component';
import { AdminGuard } from  './login/login.guard';
import { HeaderComponent } from './header/header.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';

const routes: Routes = [
  {
    path:  '',
    component:  AppComponent,

    children: [
      // [...]
      
      {
        path: 'header',
        component: HeaderComponent,
        canActivate: [AdminGuard]
      },          
    {
        path: 'place-order',
        component: PlaceOrderComponent,
        canActivate: [AdminGuard]
    },  
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'verify-email',
        component: VerifyEmailComponent,
    },
    
    { 
        path: 'login', 
        component: LoginComponent 
    }
    ],
  
  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
