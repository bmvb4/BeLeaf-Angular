import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../Shared/Models/Class/user';
import { AccountServicesService } from 'src/app/Shared/account-services.service'
import { TokenService } from '../Shared/token.service';

const USER_KEY: any = 'auth-user'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  isEditProfile:boolean = false;
  userPhoto: any;
  username: any;
  firstname: any;
  lastname: any;
  description: any;
  myUserCache: any = localStorage.getItem(USER_KEY)
    myUser: any =
      this.myUserCache !== null ? JSON.parse(this.myUserCache) : new User();
    imageSrc: any;
  updateUser:any = this.myUser;
  constructor(private apiService: AccountServicesService,private tokenStorage: TokenService) { }
  get f() {
    return this.myForm.controls;
  }
  ngOnInit(): void {


    console.log(this.myUser);
    this.userPhoto = this.myUser.photo;
    this.username = this.myUser.username;
    this.firstname = this.myUser.firstName;
    this.lastname = this.myUser.lastName;
    this.description = this.myUser.description;

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
    this.updateUser.description = this.description
    this.updateUser.firstName = this.firstname
    this.updateUser.lastName = this.lastname
    this.updateUser.photo = image
    this.apiService.ProfileUpdate(this.updateUser).subscribe(resp => {
      this.tokenStorage.saveUser(resp.body);
      this.userPhoto = resp.body?.photo;
      this.isEditProfile = (this.isEditProfile)?false:true;
    }, error => {
      console.log(error);
    });
  }
}

