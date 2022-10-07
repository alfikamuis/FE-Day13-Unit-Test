import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  authForm!: FormGroup;
  isSubmitted  =  false;
  
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.authForm  =  this.formbuilder.group({
      id: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
  });
  }

  get formControls() { 
    return this.authForm.controls; 
  }

  signUp(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    this.registerService.create(this.authForm.value).subscribe((data:any) => {
      console.log(data);
      this.router.navigateByUrl('/home');
    });
  }

}
