import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AccountServicesService } from 'src/app/Shared/account-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor( private apiService: AccountServicesService, private actRoute: ActivatedRoute,private router: Router
    ) { }

  ngOnInit(): void {
    console.log("Hi")
    this.actRoute.paramMap.subscribe(res => {
      let username = res.get('username')
      let code = res.get('code')
      this.apiService.ConfirmEmail(code, username).subscribe(resp => {
        console.log("go login")
        this.router.navigate(['./login']);
      }, error => {
        console.log(error);
      });
    });
  }
}
