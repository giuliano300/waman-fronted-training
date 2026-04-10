import { Injectable } from '@angular/core';
import { API_URL } from '../../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classrooms } from '../interfaces/Classrooms';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {

  private apiUrl = API_URL + "Classrooms";
  
  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Classrooms[]>{
    return this.http.get<Classrooms[]>(this.apiUrl);
  }

  getTeacher(id: number): Observable<Classrooms> {
    return this.http.get<Classrooms>(this.apiUrl + "/" + id);
  }

}
