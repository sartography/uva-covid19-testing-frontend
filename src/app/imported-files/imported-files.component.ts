import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { PageEvent } from '@angular/material/paginator'
import { IvyFile } from '../models/ivyfile.interface';

@Component({
  selector: 'app-imported-files',
  templateUrl: './imported-files.component.html',
  styleUrls: ['./imported-files.component.css']
})
export class ImportedFilesComponent implements OnInit {
  fileDataList: any[][] = [];

  constructor(private fileService: ApiService) { }


  ngOnInit(): void {
    this.fileService.getFilesInfo(0).subscribe(fileList => this.fileDataList = fileList);
 
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'text', 'email'];
  current_page: number = 0;
  pageSize: number = 10;

  updatePage() {
    
    this.fileService.getFilesInfo(this.current_page).subscribe(fileList => this.fileDataList = fileList);
  }
  next() {
    if (this.fileDataList.length > 0) {
      this.current_page += 1;
      this.updatePage();
    }
  }
  prev() {
    if (this.current_page > 0) {
      this.current_page -= 1;
      this.updatePage();
    }
  }

}

