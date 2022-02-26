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
import { ProfileComponent } from './Application/profile/profile.component';
HomeFeedComponent
const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path:'', redirectTo:'/feed', pathMatch:'full'},
  { path:'',component:MenuComponent, canActivate: [GuardService], children:[{
    path:'feed', component:HomeFeedComponent, canActivate: [GuardService] },
    {path:'settings', component:SettingsComponent, canActivate: [GuardService]},
    {path:'profile', component:MyProfileComponent, canActivate: [GuardService]},
    {path:'profile/:id', component:ProfileComponent, canActivate: [GuardService]},
    {path:'create', component:PostCreateComponent, canActivate: [GuardService]}]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
