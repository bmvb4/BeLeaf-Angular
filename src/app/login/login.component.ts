import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Shared/login.service';
import { IUser } from '../Shared/Models/Interface/iuser';
import { User } from '../Shared/Models/Class/user';
import { TokenService } from '../Shared/token.service';
const USER_KEY:any = 'auth-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseStatus: number | undefined;
  formLogin: FormGroup;
  submitted = false;
  loading = false;
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  get f() { return this.formLogin.controls; }
  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.formLogin.invalid) {
      return;
    }
    var flag = false;
    this.loading = true;
    var usr = new User();
    usr.username = this.f.username.value;
    usr.password = this.f.password.value;

    this.apiService.Login(usr).subscribe(resp => {
      console.log(resp.body)
      const jsonUser = JSON.stringify(resp.body)
      this.tokenStorage.saveToken(resp.body?.accessToken || "");
      this.tokenStorage.saveRefreshToken(resp.body?.refreshToken || "");
      this.tokenStorage.saveUser(resp.body);
      console.log(this.tokenStorage.getToken());
      usr = <IUser>resp.body;
      console.log(this.tokenStorage.getUser());
      this.router.navigate(['./feed']);
    }, error => {
      this.loading = false;
    });

  }

}
