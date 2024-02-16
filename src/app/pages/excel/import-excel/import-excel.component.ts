import { Component, OnInit } from '@angular/core';
import { ReadexcelfileService } from 'src/app/services/readexcelfile.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(private _ReadexcelfileService:ReadexcelfileService){}

  ngOnInit(): void { 
  }

  upload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];

        console.log(this.selectedFile);
        
    }
 }

 save() {
  if (!this.selectedFile) {
      alert('Please select a file before saving.');
      return;
    }
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    this._ReadexcelfileService.ReadFile(fd).subscribe((res:any) => {
      console.log(res);
    })

}


}
