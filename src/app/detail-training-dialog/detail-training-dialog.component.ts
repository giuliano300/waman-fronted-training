import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-detail-training-dialog',
  templateUrl: './detail-training-dialog.component.html',
  styleUrls: ['./detail-training-dialog.component.scss'],
  standalone:true,
  imports: [MatDialogModule, CommonModule]
})
export class DetailTrainingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailTrainingDialogComponent>,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

  onCancel(): void {
    this.dialogRef.close(false); // L'utente ha annullato
  }

    getDate(date: string){
      return this.utilsService.getDateFormatted(new Date(date));
    }

}
