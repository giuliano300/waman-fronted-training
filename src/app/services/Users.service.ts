import { Injectable } from '@angular/core';
import { API_URL } from '../../main';
import { HttpClient } from '@angular/common/http';
import { Users } from '../interfaces/Users';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = API_URL + "UsersTrainingCompany";
  
  constructor(private http: HttpClient) {}

  login(login:Login): Observable<Users>{
    return this.http.post<any>(this.apiUrl + "/login", login);
  }

  passwordRecovery(value: any) {
    return this.http.post<any>(this.apiUrl + "/pwdRecovery", value);
  }

}
