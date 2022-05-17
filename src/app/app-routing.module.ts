import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './Application/menu/menu.component';
import { HomeFeedComponent } from './Application/home-feed/home-feed.component';
import { SettingsComponent } from './settings/settings.component';
import { PostCreateComponent } from './Application/post-create/post-create.component';
import { GuardService } from './Shared/_guard/guard.service'
import { ProfileComponent } from './Application/profile/profile.component';
import { EmailComponent } from './register/email/email.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { GenerateEmailComponent } from './Application/generate-email/generate-email.component';
HomeFeedComponent
const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'resend', component: GenerateEmailComponent },
  { path: 'email/:username/:code', component: EmailComponent },
  { path:'', redirectTo:'/feed', pathMatch:'full'},
  { path:'',component:MenuComponent, canActivate: [GuardService],runGuardsAndResolvers: 'paramsOrQueryParamsChange', children:[{
    path:'feed', component:HomeFeedComponent, canActivate: [GuardService] ,runGuardsAndResolvers: 'paramsOrQueryParamsChange'},
    {path:'settings', component:SettingsComponent, canActivate: [GuardService],runGuardsAndResolvers: 'paramsOrQueryParamsChange'},
    {path:'profile', component:ProfileComponent, canActivate: [GuardService],runGuardsAndResolvers: 'paramsOrQueryParamsChange'},
    {path:'profile/:id', component:ProfileComponent, canActivate: [GuardService],runGuardsAndResolvers: 'paramsOrQueryParamsChange'},
    {path:'create', component:PostCreateComponent, canActivate: [GuardService],runGuardsAndResolvers: 'paramsOrQueryParamsChange'}]},
    { path: '**', pathMatch: 'full', component: PagenotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
