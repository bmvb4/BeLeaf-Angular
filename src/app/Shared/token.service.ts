import { Injectable } from '@angular/core';
const TOKEN_KEY:any = 'auth-token';
const REFRESHTOKEN_KEY:any = 'auth-refreshtoken';
const USER_KEY:any = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public signOut(): void {
    console.log("GG")
    sessionStorage.clear();
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    sessionStorage.removeItem(REFRESHTOKEN_KEY);
    sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public saveEmailUsername(user: string): void {
    sessionStorage.removeItem("Email-Send");
    sessionStorage.setItem("Email-Send",user);
  }
  public getEmailUsername(): string | null {
    return sessionStorage.getItem("Email-Send");
  }
  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return "";
  }
}
