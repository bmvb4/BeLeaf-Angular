import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AccountServicesService } from '../account-services.service';
import { Token } from '../Models/Class/token';
import { User } from '../Models/Class/user';
import { TokenService } from '../token.service';
const USER_KEY:any = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  myUserCache: any = sessionStorage.getItem(USER_KEY);

  myUser:User = this.myUserCache !== null ? JSON.parse(this.myUserCache) : new User();
  constructor(private router: Router, private apiService: AccountServicesService, private tokenStorage: TokenService) { }
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const myAccessToken: any = this.tokenStorage.getToken();
    const myRefreshToken: any = this.tokenStorage.getRefreshToken();

    if (sessionStorage.getItem(USER_KEY)) {
      if(myAccessToken){
        if (this.tokenExpired(myAccessToken)) {
          console.log("token expired!");
       } else {
           console.log("token is expired!");
          return true;
       }
      }

    }
    var myToken = new Token();
    myToken.accessToken = myAccessToken;
    myToken.refreshToken = myRefreshToken;

    this.apiService.RefreshToken(myToken).subscribe(
      (resp) => {
        console.log("update")
        console.log(resp.body)
        this.tokenStorage.saveToken(resp.body?.accessToken || "");
        this.tokenStorage.saveRefreshToken(resp.body?.refreshToken || "");
        return true;
      },
      (error) => {
        console.error(error.body)
        this.router.navigate(['./login']);
        return false;
      },
    )
      return true;
}
}
