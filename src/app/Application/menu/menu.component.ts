import { Component, OnInit, ViewChild } from '@angular/core'
import { User } from 'src/app/Shared/Models/Class/user'
import { TokenService } from 'src/app/Shared/token.service'

const USER_KEY: any = 'auth-user'
export interface RouteInfo {
  path: string
  title: string
  icon: string
  class: string
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  tokenStorage: TokenService
  location: Location
  private toggleButton: any
  private sidebarVisible: boolean = false
  public isCollapsed = true
  myUserData = localStorage.getItem(USER_KEY)
  myUser = this.myUserData !== null ? JSON.parse(this.myUserData) : new User()
  userPhoto = this.myUser.photo
  username = this.myUser.username
  constructor() {}
  public menuItems: any[]
  ROUTES: RouteInfo[] = [
    { path: '/profile/'+this.username, title: 'Profile', icon: 'nc-circle-10', class: '' },
    { path: '/feed', title: 'Feed', icon: 'nc-bullet-list-67', class: '' },
    { path: '/create', title: 'Post', icon: 'nc-cloud-upload-94', class: '' },
  ]
  ngOnInit(): void {
    this.menuItems = this.ROUTES.filter((menuItem) => menuItem)

  }

  sidebarToggle() {
    console.log('Side bar is ' + this.sidebarVisible)
    if (this.sidebarVisible === false) {
      this.sidebarOpen()
    } else {
      console.log('fuck you ' + this.sidebarVisible)
      this.sidebarClose()
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton
    const html = document.getElementsByTagName('html')[0]
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    )
    console.log('Open menu!!!')
    html.classList.add('nav-open')
    this.sidebarVisible = true
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0]
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    )
    this.sidebarVisible = false
    html.classList.remove('nav-open')
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed
    const navbar = document.getElementsByTagName('nav')[0]
    console.log(navbar)
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent')
      navbar.classList.add('bg-white')
    } else {
      navbar.classList.add('navbar-transparent')
      navbar.classList.remove('bg-white')
    }
  }
  SignOut(){
    localStorage.clear();
  }
}
