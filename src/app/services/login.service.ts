import { Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { } 

  public signIn(account: Account) {
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  } 
  
  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  } 
  
  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

}
