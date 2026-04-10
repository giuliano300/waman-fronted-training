import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../../main';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getBooleanFromStorage('isLoggedIn'));
  private loginNameSubject = new BehaviorSubject<string>("");
  
  constructor(private http: HttpClient) { }

  // Osservabili pubblici
  isLoggedIn = this.isLoggedInSubject.asObservable();
  loginName$ = this.loginNameSubject.asObservable();

  // Imposta valori
  setLoginName(value: string) {
    localStorage.setItem('loginName', JSON.stringify(value));
    this.loginNameSubject.next(value);
  }

  setIsLoggedIn(value: boolean) {
    localStorage.setItem('isLoggedIn', JSON.stringify(value));
    this.isLoggedInSubject.next(value);
  }

  // Pulisce i ruoli
  clearRoles() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginName');
    this.isLoggedInSubject.next(false);
    this.loginNameSubject.next("");
  }

  // Legge da localStorage
  private getBooleanFromStorage(key: string): boolean {
    return localStorage.getItem(key) === 'true';
  }

  
  passwordRecovery(value: any): Observable<boolean> {
    return this.http.post<any>(API_URL + "/Automations/ChangePassword", value);
  }

  passwordChange(value: any): Observable<boolean> {
    return this.http.post<any>(API_URL + "/Automations/ChangePasswordRequest", value);
  }

}
