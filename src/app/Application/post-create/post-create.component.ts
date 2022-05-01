import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Shared/account-services.service';
import { NewPost } from 'src/app/Shared/Models/Class/new-post';
import { Posts } from 'src/app/Shared/Models/Class/posts';
import { User } from 'src/app/Shared/Models/Class/user';
import {NgxImageCompressService} from "ngx-image-compress";
const USER_KEY: any = 'auth-user';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  myUser: User;
  defautSrc: string = "./assets/upload.png";
  imageSrc: string = "";
  loading = false;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  constructor(private apiService: AccountServicesService, private router: Router, private imageCompress: NgxImageCompressService) { }

  ngOnInit() {
    let myUserStorage = sessionStorage.getItem(USER_KEY);

    this.myUser = myUserStorage !== null ? JSON.parse(myUserStorage) : new User();
  }
  get f() {
      return this.myForm.controls;
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
    compressFile() {
      const MAX_MEGABYTE = 2;
      this.imageCompress
        .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
        .then(
          (result: string) => {
            this.imageSrc = result;
          },
          (result: string) => {
            console.error('The compression algorithm didn\'t succed! The best size we can do is', this.imageCompress.byteCount(result), 'bytes')
            this.imageSrc = result;
          });
    }
  submit(description:string) {
    this.loading = true;
    var newPost = new NewPost();
    var removePosition = this.imageSrc.indexOf(',');
    var image = this.imageSrc.substring(removePosition + 1);
    newPost.photo = image;
    newPost.idUser = this.myUser.username;
    newPost.description = description;
    console.log(removePosition);
      this.apiService.MakePost(newPost).subscribe(resp => {
        console.log(resp.body);
        console.log(<Posts>resp.body);
        this.loading = false;
        this.router.navigate(['./feed']);
      }, error => {
        console.error(error);
        this.loading = false;
      });
    }
  }
