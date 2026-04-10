import { Injectable } from '@angular/core';
import { API_URL } from '../../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teachers } from '../interfaces/Teachers';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private apiUrl = API_URL + "Teachers";
  
  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teachers[]>{
    return this.http.get<Teachers[]>(this.apiUrl);
  }

  getTeacher(id: number): Observable<Teachers> {
    return this.http.get<Teachers>(this.apiUrl + "/" + id);
  }

}
