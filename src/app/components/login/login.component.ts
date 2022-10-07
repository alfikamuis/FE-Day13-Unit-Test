import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;
  isSubmitted  =  false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.authForm  =  this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get formControls() { 
    return this.authForm.controls; 
  }

  signIn(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    this.loginService.signIn(this.authForm.value);
    this.router.navigateByUrl('/dashboard');
  }

}
