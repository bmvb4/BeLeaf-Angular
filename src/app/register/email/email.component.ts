import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AccountServicesService } from 'src/app/Shared/account-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  formLogin: FormGroup;

  submitted = false;
  loading = false;
  formBuilder: any;
  constructor( private apiService: AccountServicesService, private actRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.actRoute.paramMap.subscribe(res => {
      let username = res.get('username')
      let code = res.get('code')
      this.apiService.ConfirmEmail(code, username).subscribe(resp => {
        console.log(resp.body)
      }, error => {
        console.log(error);
        this.loading = false;
      });
    });
  }
  get f() { return this.formLogin.controls; }
  confirmCode(){

  }
}
