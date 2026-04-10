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
import { Teachers } from '../../interfaces/Teachers';
import { TeachersService } from '../../services/Teachers.service';


@Component({
  selector: 'app-teachers',
  imports: [MatCardModule, MatButtonModule, MatSlideToggleModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatCheckboxModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {

  teachers: Teachers[] = [];
  displayedColumns: string[] = ['name', 'lastName', 'mobile', 'email'];
  user: Users | null  = null;
  dataSource = new MatTableDataSource<Teachers>(this.teachers);

  constructor(
      private router: Router,
      private teacherService: TeachersService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (!token) 
      this.router.navigate(['/']);

    const user = localStorage.getItem('user');
    if (!user)
      this.router.navigate(['/']);

    this.user! = JSON.parse(user!);

    this.getTeachers();
  }

  getTeachers(){
    this.teacherService.getTeachers()
        .subscribe((data: Teachers[]) => {
          if (!data || data.length === 0) {
            console.log('Nessun dato disponibile');
          } else {
            this.teachers = data;
            this.dataSource = new MatTableDataSource<Teachers>(this.teachers);
            this.dataSource.paginator = this.paginator;
        }
    });
  }


  exportAll() {
    if (!this.teachers || this.teachers.length === 0) {
      console.warn('Nessun dato da esportare');
      return;
    }

    // Intestazioni
    const headers = ['Name', 'Lastname', 'Mobile', 'Email'];

    // Righe dati
    const rows = this.teachers.map(t => [
      t.name ?? '',
      t.lastName ?? '',
      t.mobile ?? '',
      t.email ?? ''
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
    link.setAttribute('download', 'teachers.csv');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }
}
