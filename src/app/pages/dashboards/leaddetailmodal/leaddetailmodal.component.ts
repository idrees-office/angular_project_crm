import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface Fileddata {
  name: any;
  values: any;
}

@Component({
  selector: 'app-leaddetailmodal',
  templateUrl: './leaddetailmodal.component.html',
  styleUrls: ['./leaddetailmodal.component.scss'],
})
export class LeaddetailmodalComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    if (typeof data === 'string') {
      this.data = JSON.parse(data);
    }
  }

 
} 
