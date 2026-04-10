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
import { Classrooms } from '../../interfaces/Classrooms';
import { ClassroomsService } from '../../services/Classrooms.service';


@Component({
  selector: 'app-classrooms',
  imports: [MatCardModule, MatButtonModule, MatSlideToggleModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatCheckboxModule],
  templateUrl: './classrooms.component.html',
  styleUrl: './classrooms.component.scss'
})
export class ClassroomsComponent {

  classrooms: Classrooms[] = [];
  displayedColumns: string[] = ['name', 'address', 'mobile', 'managerName', 'managerContactNumber', 'managerEmail'];
  user: Users | null  = null;
  dataSource = new MatTableDataSource<Classrooms>(this.classrooms);

  constructor(
      private router: Router,
      private classroomsService: ClassroomsService
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

    this.getClassrooms();
  }

  getClassrooms(){
    this.classroomsService.getTeachers()
        .subscribe((data: Classrooms[]) => {
          if (!data || data.length === 0) {
            console.log('Nessun dato disponibile');
          } else {
            this.classrooms = data;
            this.dataSource = new MatTableDataSource<Classrooms>(this.classrooms);
            this.dataSource.paginator = this.paginator;
        }
    });
  }


  exportAll() {
    if (!this.classrooms || this.classrooms.length === 0) {
      console.warn('Nessun dato da esportare');
      return;
    }

    // Intestazioni
    const headers = ['Name', 'Address', 'Mobile', 'Manager name', 'Manager number', 'Manager email'];

    // Righe dati
    const rows = this.classrooms.map(t => [
      t.name ?? '',
      t.address ?? '',
      t.mobile ?? '',
      t.managerName ?? '',
      t.managerContactNumber ?? '',
      t.managerEmail ?? '',
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
    link.setAttribute('download', 'classrooms.csv');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }
}
