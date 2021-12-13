import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../Models/Class/user';
import { TokenService } from '../token.service';
const USER_KEY:any = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  private tokenStorage: TokenService;
  myUserCache: any = localStorage.getItem(USER_KEY);
  myUser:User = this.myUserCache !== null ? JSON.parse(this.myUserCache) : new User();
  constructor(private router: Router) { }
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(localStorage.getItem(USER_KEY));
    if (localStorage.getItem(USER_KEY)) {
         if (this.tokenExpired(this.myUser.accessToken)) {
           console.log("token expired!");
        } else {
           console.log("token is expired!");
           return true;
        }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    console.log("Go home and kill yourself!!!");
    return false;
}
}
