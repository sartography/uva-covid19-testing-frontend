import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { PageEvent } from '@angular/material/paginator';
import { IvyFile } from '../models/ivyfile.interface';

@Component({
  selector: 'app-imported-files',
  templateUrl: './imported-files.component.html',
  styleUrls: ['./imported-files.component.css']
})
export class ImportedFilesComponent implements OnInit {

  constructor(private fileService: ApiService) { }
  fileDataList: any[][] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'text', 'email'];
  currentPage = 0;
  pageSize = 10;


  ngOnInit(): void {
    this.fileService.getFilesInfo(0).subscribe(fileList => this.fileDataList = fileList);

  }

  updatePage() {

    this.fileService.getFilesInfo(this.currentPage).subscribe(fileList => this.fileDataList = fileList);
  }
  next() {
    if (this.fileDataList.length > 0) {
      this.currentPage += 1;
      this.updatePage();
    }
  }
  prev() {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
      this.updatePage();
    }
  }

}

