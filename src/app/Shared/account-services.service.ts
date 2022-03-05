import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { User } from './Models/Class/user'
import 'rxjs/Rx'
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { IUser } from './Models/Interface/iuser'
import { IPosts } from './Models/Interface/iposts'
import { Like } from './Models/Class/like'
import { ILike } from './Models/Interface/ilike'
import { Follow } from './Models/Class/follow'
import { IFollow } from './Models/Interface/ifollow'
import { TokenService } from './token.service'
import { NewPost } from './Models/Class/new-post'
import { INewPost } from './Models/Interface/inew-post'
import { Comment } from './Models/Class/comment'
import { IComment } from './Models/Interface/icomment'
import { IGetComment } from './Models/Interface/igetcomment'
import { IProfiles } from './Models/Interface/iprofiles'
import { Token } from './Models/Class/token'
import { IToken } from './Models/Interface/itoken'
import { Posts } from './Models/Class/posts'
//var maniUrl = 'http://localhost:5201'
var maniUrl = 'http://159.65.94.122'
@Injectable({
  providedIn: 'root',
})
export class AccountServicesService {
  constructor(private http: HttpClient, private tokenStorage: TokenService) {
    this.http = http
  }

  Register(user: User): Observable<HttpResponse<IUser>> {
    const myheaders = new HttpHeaders({ 'Content-Type': 'application/json' })
    const body = JSON.stringify(user)
    console.log(body)
    var url = maniUrl + '/register'
    return this.http.post<IUser>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }

  GetLastPost(page: Number): Observable<HttpResponse<IPosts>> {
    console.log(this.tokenStorage.getToken())
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    var url = maniUrl + '/posts/getlast/' + page
    return this.http.get<IPosts>(url, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  GetUserPost(UserId:string,page: Number): Observable<HttpResponse<IPosts>> {
    console.log(this.tokenStorage.getToken())
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    var url = maniUrl + '/posts/getAll/'+UserId+'/' + page
    return this.http.get<IPosts>(url, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  LikePost(like: Like): Observable<HttpResponse<ILike>> {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    const body = JSON.stringify(like)
    var url = maniUrl + '/posts/like'
    return this.http.post<ILike>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  UnlikePost(like: Like): Observable<HttpResponse<ILike>> {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    const body = JSON.stringify(like)
    var url = maniUrl + '/posts/unlike'
    return this.http.post<ILike>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  FollowPost(follow: Follow): Observable<HttpResponse<IFollow>> {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    const body = JSON.stringify(follow)
    var url = maniUrl + '/follow'
    return this.http.post<IFollow>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  UnfollowPost(follow: Follow): Observable<HttpResponse<IFollow>> {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    const body = JSON.stringify(follow)
    var url = maniUrl + '/follow/unfollow'
    return this.http.post<IFollow>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  MakePost(post: NewPost): Observable<HttpResponse<INewPost>> {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    const body = JSON.stringify(post)
    var url = maniUrl + '/posts/post'
    return this.http.post<INewPost>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  UpdatePost(post: Posts): Observable<HttpResponse<IPosts>> {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    const body = JSON.stringify(post)
    var url = maniUrl + '/posts/update/'+post.idPost
    return this.http.put<IPosts>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  DeletePost(post: Posts) {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    const bodyComment = JSON.stringify(post)
    var url = maniUrl + '/posts/delete'
    return this.http.request('delete', url, {
      headers: myheaders,
      responseType: 'json',
      body: bodyComment,
    })
  }
  MakeComment(comment: Comment): Observable<HttpResponse<IComment>> {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    const body = JSON.stringify(comment)
    var url = maniUrl + '/posts/comment'
    return this.http.post<IComment>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }

  DeleteComment(comment: Comment) {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })

    const bodyComment = JSON.stringify(comment)
    var url = maniUrl + '/posts/comment'
    return this.http.request('delete', url, {
      headers: myheaders,
      responseType: 'json',
      body: bodyComment,
    })
  }

  GetComments(
    postId: any,
    page: Number,
  ): Observable<HttpResponse<IGetComment>> {
    console.log(this.tokenStorage.getToken())
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })
    var url = maniUrl + '/posts/comment/get/' + postId + '/' + page
    return this.http.get<IGetComment>(url, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  GetUserProfile(
    userId: any,
  ): Observable<HttpResponse<IProfiles>> {
    console.log(this.tokenStorage.getToken())
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    })
    var url = maniUrl + '/profile/user/get/' + userId
    return this.http.get<IProfiles>(url, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
  RefreshToken(token: Token): Observable<HttpResponse<IToken>> {
    console.log(this.tokenStorage.getToken)
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const body = JSON.stringify(token)
    var url = maniUrl + '/token/refresh'
    return this.http.post<IToken>(url, body, {
      headers: myheaders,
      observe: 'response',
      responseType: 'json',
    })
  }
}
