import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
//import { ContactComponent } from './pages/contacts/contact/contact.component';
import { LoginGuard } from './services/login-guard';
import { ContactDetailComponent } from './pages/contacts/contact-detail/contact-detail.component';
import { CreateContactComponent } from './pages/contacts/create-contact/create-contact.component';

const routes: Routes = [
  { path:'', canActivate: [LoginGuard], component:HomeComponent },
  { path:'login', component:LoginComponent},
  { path:'contacts', canActivate: [LoginGuard], component:ContactsComponent},
  { path:'create-contact',canActivate: [LoginGuard], component:CreateContactComponent },
  { path:'contacts/:id', canActivate: [LoginGuard], component: ContactDetailComponent},
  { path:'profile', canActivate: [LoginGuard], component:ProfileComponent},
  { path:'**', redirectTo:'', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
