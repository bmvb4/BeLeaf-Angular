import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/Models/Class/user';

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
  constructor() { }

  ngOnInit(): void {

    let myUser = localStorage.getItem('User');
    let test = myUser !== null ? JSON.parse(myUser) : new User();
    console.log(test);
    this.userPhoto = test.photo;
    this.username = test.username;
    this.firstname = test.firstName;
    this.lastname = test.lastName;
    this.description = test.description;
  }
}
