import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './Application/menu/menu.component';
import { HomeFeedComponent } from './Application/home-feed/home-feed.component';
import { SettingsComponent } from './settings/settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PostCreateComponent } from './Application/post-create/post-create.component';
import { GuardService } from './Shared/_guard/guard.service'
HomeFeedComponent
const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'register', component: RegisterComponent },

  { path:'', component:MenuComponent, canActivate: [GuardService], children:[{
    path:'feed', component:HomeFeedComponent },
    {path:'settings', component:SettingsComponent},
    {path:'profile', component:MyProfileComponent},
    {path:'create', component:PostCreateComponent}]},
  { path:'', redirectTo:'/feed', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
