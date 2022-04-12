import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Shared/account-services.service'
import { Follow } from 'src/app/Shared/Models/Class/follow';
import { PostComment } from 'src/app/Shared/Models/Class/post-comment';
import { Profiles } from 'src/app/Shared/Models/Class/profiles';
import { User } from 'src/app/Shared/Models/Class/user';
import { IComment } from 'src/app/Shared/Models/Interface/icomment';
import { IPosts } from 'src/app/Shared/Models/Interface/iposts';
import { IProfiles } from 'src/app/Shared/Models/Interface/iprofiles';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/Shared/token.service';
const USER_KEY: any = 'auth-user'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  postsGet: IPosts[] = []
  commentsGet: IComment[] = []
  PostCommets: PostComment[] = []
  imageSrc: any;
  userPhoto: any;
  posts: any
  comments: any
  isLike: any
  UserId:string;
  userProfile: Profiles;
  page = 0
  isEditProfile = false;
  myUserCache: any = localStorage.getItem(USER_KEY)
  myUser: any =
    this.myUserCache !== null ? JSON.parse(this.myUserCache) : new User()
    updateUser:any = this.myUser
  constructor(private router: Router,private actRoute: ActivatedRoute, private apiService: AccountServicesService, private location: Location,private tokenStorage: TokenService) {
    this.UserId = this.actRoute.snapshot.params.id;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

   }
   get f() {
    return this.myForm.controls;
  }
  ngOnInit(): void {
    console.log(this.UserId)
    this.apiService.GetUserProfile(this.UserId).subscribe(
      (resp) => {
        this.userProfile = <IProfiles>resp.body

      },
      (error) => {
        console.error(error)
        this.location.back()
      },
    )
  }
  followUser() {
    console.log('Follow')
    var follow = new Follow()
    follow.idFollowed = this.userProfile.username

    follow.idFollower = this.myUser.username
    console.log(follow)
    if (this.userProfile.isFollow) {
      this.apiService.UnfollowPost(follow).subscribe(
        (resp) => {
          this.userProfile.isFollow = false
          this.userProfile.follower--
        },
        (error) => {
          console.error(error)
        },
      )
    } else {
      this.apiService.FollowPost(follow).subscribe(
        (resp) => {
          this.userProfile.isFollow = true
          this.userProfile.follower++
        },
        (error) => {
          console.error(error)
        },
      )
    }
  }
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }
  editProfile(){
    this.isEditProfile = (this.isEditProfile)?false:true;
  }
  editProfilPut(){
    var removePosition = this.myForm.value.fileSource.indexOf(',');
    var image = this.myForm.value.fileSource.substring(removePosition + 1);
    this.updateUser.description = this.myUser.description
    this.updateUser.firstName = this.myUser.firstName
    this.updateUser.lastName = this.myUser.lastName
    if(image!=null || image!=""){
      this.updateUser.photo = image
    }else{
      this.updateUser.photo = this.myUser.photo
    }
    console.log(image);
    this.apiService.ProfileUpdate(this.updateUser).subscribe(resp => {
      this.tokenStorage.saveUser(resp.body);
      this.userPhoto = resp.body?.photo;
      this.isEditProfile = (this.isEditProfile)?false:true;
    }, error => {
      console.log(error);
    });
  }

}
