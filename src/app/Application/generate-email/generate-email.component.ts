import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Shared/account-services.service';
import { User } from 'src/app/Shared/Models/Class/user';
import { IUser } from 'src/app/Shared/Models/Interface/iuser';
import { TokenService } from 'src/app/Shared/token.service';

@Component({
  selector: 'app-generate-email',
  templateUrl: './generate-email.component.html',
  styleUrls: ['./generate-email.component.css']
})
export class GenerateEmailComponent implements OnInit {

  loading = false;
  constructor(private apiService: AccountServicesService, private router: Router,private tokenStorage: TokenService) { }

  ngOnInit(): void {

  }
  Resend(){
    this.loading = true;
    var user = new User();
    user.username = this.tokenStorage.getEmailUsername()!;

    this.apiService.GenerateEmail(user).subscribe(
      resp=>{
        this.loading = false;
      },(error) => {
        console.error(error.error);
        this.loading = false;
      });
  }

}
