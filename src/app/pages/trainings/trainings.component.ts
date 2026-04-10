import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../../interfaces/Users';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UtilsService } from '../../utils.service';
import { MatDialog } from '@angular/material/dialog';
import { CompleteTeacherPlanning } from '../../interfaces/CompleteTeacherPlanning';
import { TrainingsService } from '../../services/Trainings.service';
import { DetailTrainingDialogComponent } from '../../detail-training-dialog/detail-training-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgFor, NgIf } from '@angular/common';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatOption } from "@angular/material/select";
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';


@Component({
  selector: 'app-trainings',
  imports: [MatCardModule, 
    MatButtonModule, 
    MatSlideToggleModule, 
    MatMenuModule, 
    MatPaginatorModule, 
    MatTableModule, 
    MatCheckboxModule, 
    MatProgressBarModule, 
    NgIf, 
    MatFormField, 
    FeathericonsModule, 
    MatLabel, 
    MatSelect, 
    MatOption,
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent {

  completeTeacherPlanning: CompleteTeacherPlanning[] = [];
  displayedColumns: string[] = ['name', 'day1', 'day2', 'day3', 'teacher', 'classroom', 'viewDetails'];
  user: Users | null  = null;
  dataSource = new MatTableDataSource<CompleteTeacherPlanning>(this.completeTeacherPlanning);
  firstLoading: boolean = true;
  form: FormGroup;
  years = [new Date().getFullYear() - 1, new Date().getFullYear()];

  constructor(
      private dialog: MatDialog,
      private router: Router,
      private fb: FormBuilder,
      private trainingService: TrainingsService,
      private utilsService: UtilsService
  ) {
    this.form = this.fb.group({
      year: [new Date().getFullYear()],
      make: []
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (!token) 
      this.router.navigate(['/']);

    const user = localStorage.getItem('user');
    if (!user)
      this.router.navigate(['/']);

    this.user! = JSON.parse(user!);

    this.getTrainings(this.form.value.year!, this.form.value.make);
  }

  getTrainings(year: number, doIt?: boolean){
    this.trainingService.getList(year, doIt)
        .subscribe((data: CompleteTeacherPlanning[]) => {
          this.firstLoading = false;
          if (!data || data.length === 0) {
            console.log('Nessun dato disponibile');
            this.dataSource = new MatTableDataSource<CompleteTeacherPlanning>([]);
          } else {
            this.completeTeacherPlanning = data
             .sort((a, b) => new Date(b.planning.day_3).getTime() - new Date(a.planning.day_3).getTime())
             .map(c => ({
                ...c, 
                action: {
                    viewDetails: 'ri-menu-search-line'
                }
            }));
            this.dataSource = new MatTableDataSource<CompleteTeacherPlanning>(this.completeTeacherPlanning);
            this.dataSource.paginator = this.paginator;
        }
    });
  }

  onSubmit(){
    this.firstLoading = true;
    this.getTrainings(this.form.value.year!, this.form.value.make);
  }

  remove(){
    this.firstLoading = true;
    this.getTrainings(new Date().getFullYear());
  }

  exportAll() {
    if (!this.completeTeacherPlanning || this.completeTeacherPlanning.length === 0) {
      console.warn('Nessun dato da esportare');
      return;
    }

    // Intestazioni
    const headers = ['Name', 'Day 1', 'Day 2', 'Day 3', 'Teacher', 'Classroom', 'Workers'];

    // Righe dati
    const rows = this.completeTeacherPlanning.map(t => [
      t.planning.coursesName ?? '',
      t.planning.day_1 ?? '',
      t.planning.day_2 ?? '',
      t.planning.day_3 ?? '',
      t.teacher.name, 
      t.classroom.name,
      t.completeWt?.map(w => `${w.worker.name} ${w.worker.lastName}`).join(', ') ?? ''
    ]);

    // Costruzione CSV
    const csvContent = [
      headers.join(';'),
      ...rows.map(r => r.join(';'))
    ].join('\n');

    // Blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'trainings.csv');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  getDate(date: string){
    return this.utilsService.getDateFormatted(new Date(date));
  }

  gotoDetail(id: number){
    const data = this.completeTeacherPlanning.find(c => c.planning.id === id);
    if (!data) return;

    console.log(data);

      const dialogRef = this.dialog.open(DetailTrainingDialogComponent, {
        data: data,
        width: '1000px',
        minWidth: '1000px'
      });
  }
}
