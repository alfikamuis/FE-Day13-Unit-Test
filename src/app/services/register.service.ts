import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  create(payload: Register) {
    return this.http.post<Register>('http://localhost:3000/register', payload);
  }

}
