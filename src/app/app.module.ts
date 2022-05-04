import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './Application/menu/menu.component';
import { HomeFeedComponent } from './Application/home-feed/home-feed.component';
import { SettingsComponent } from './settings/settings.component';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostCreateComponent } from './Application/post-create/post-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ProfileComponent } from './Application/profile/profile.component';
import {NgxImageCompressService} from "ngx-image-compress";
import { EmailComponent } from './register/email/email.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenerateEmailComponent } from './Application/generate-email/generate-email.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    HomeFeedComponent,
    SettingsComponent,
    ShortNumberPipe,
    PostCreateComponent,
    SafeHtmlPipe,
    ProfileComponent,
    EmailComponent,
    PagenotfoundComponent,
    GenerateEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
