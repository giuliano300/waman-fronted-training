import { Injectable } from '@angular/core';
import { API_URL } from '../../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompleteTeacherPlanning } from '../interfaces/CompleteTeacherPlanning';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  private apiUrl = API_URL;
  
  constructor(private http: HttpClient) {}

  getList(year: number, doIt?: boolean): Observable<CompleteTeacherPlanning[]>{
    return this.http.get<CompleteTeacherPlanning[]>(this.apiUrl + "TeacherPlannings?y=" + year + (doIt ? "&make=" + doIt : ""));
  }

  getTrainingDetail(id: number){
    return this.http.get<any>(this.apiUrl + "WorkerTrainings/GetTrainingDetails?id=" + id);
  }
}
