import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServicesService } from '../Shared/account-services.service';
import { User } from '../Shared/Models/Class/user';
import { IUser } from '../Shared/Models/Interface/iuser';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private apiService: AccountServicesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required]]
  });
  }
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    var newUser = new User();
    newUser.firstName = this.f.firstName.value;
    newUser.lastName = this.f.lastName.value;
    newUser.username = this.f.username.value;
    newUser.password = this.f.password.value;
    newUser.email = this.f.email.value;

    this.apiService.Register(newUser).subscribe(resp => {
      console.log(resp.body)
      newUser = <IUser>resp.body
      console.log(newUser)

    },(error) => {
      console.error(error);
      this.loading = false;
    });

}
}
