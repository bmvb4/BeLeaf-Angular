import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { User } from './Models/Class/user'
import 'rxjs/Rx'
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { IUser } from './Models/Interface/iuser'
//var maniUrl = 'http://localhost:5201'
//var maniUrl = 'https://159.65.94.122'
var maniUrl = 'https://beleaf.me/api'

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {
    this.http = http
  }
  Login(user: User): Observable<HttpResponse<IUser>> {
    var resrt
    const myheaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    const body = JSON.stringify(user)
    console.log(body)
    var url = maniUrl + '/login'
    return this.http.post<IUser>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
}
