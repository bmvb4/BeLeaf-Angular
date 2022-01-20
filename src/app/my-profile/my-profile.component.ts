import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/Models/Class/user';
const USER_KEY: any = 'auth-user'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userPhoto: any;
  username: any;
  firstname: any;
  lastname: any;
  description: any;
  myUserCache: any = localStorage.getItem(USER_KEY)
    myUser: any =
      this.myUserCache !== null ? JSON.parse(this.myUserCache) : new User()
  constructor() { }

  ngOnInit(): void {

    
    console.log(this.myUser);
    this.userPhoto = this.myUser.photo;
    this.username = this.myUser.username;
    this.firstname = this.myUser.firstName;
    this.lastname = this.myUser.lastName;
    this.description = this.myUser.description;
  }
}
