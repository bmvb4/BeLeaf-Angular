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
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public saveEmailUsername(user: string): void {
    sessionStorage.removeItem("Email-Send");
    sessionStorage.setItem("Email-Send",user);
  }
  public getEmailUsername(): string | null {
    return sessionStorage.getItem("Email-Send");
  }
  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return "";
  }
}
