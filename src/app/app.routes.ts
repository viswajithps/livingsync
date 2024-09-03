import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FirstComponent } from './first/first.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { ParkingComponent } from './parking/parking.component';
import { PaymentComponent } from './payment/payment.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GalleryComponent } from './gallery/gallery.component';



export const routes: Routes = [
    {path:"", component: FirstComponent},
    {path:"login", component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:"home",component:HomeComponent},
    {path:"chat",component:ChatComponent},
    {path:"parking",component:ParkingComponent},
    {path:"payment",component:PaymentComponent},
    {path:"navbar",component:NavbarComponent},
    {path:"admin",component:AdminhomeComponent},
    {path:"calendar",component:CalendarComponent},
    {path:"gallery",component:GalleryComponent}
];

// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule],
//   })
//   export class AppRoutingModule {}
