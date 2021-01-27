import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import {PageEvent} from '@angular/material/paginator'
import { IvyFile } from '../models/ivyfile.interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-imported-files',
  templateUrl: './imported-files.component.html',
  styleUrls: ['./imported-files.component.css']
})
export class ImportedFilesComponent implements OnInit {
  fileList: IvyFile[] = [];

  constructor(private fileService: ApiService) { }

  
  ngOnInit(): void {
    this.fileService.getFiles(0).subscribe(fileList => this.fileList = fileList);
  }
  displayedColumns: string[] = ['position', 'name', 'weight'];
  current_page: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10,20,50,100];

  updatePage(event: PageEvent) {
    this.current_page = event.pageIndex;
    this.fileService.getFiles(this.current_page).subscribe(fileList => this.fileList = fileList);
  }
  next(){
    if (this.fileList.length > 0){
    this.current_page += 1; 
    this.fileService.getFiles(this.current_page).subscribe(fileList => this.fileList = fileList);  }}
  prev(){
    if (this.current_page > 0){
      this.current_page -= 1; 
      this.fileService.getFiles(this.current_page).subscribe(fileList => this.fileList = fileList);
    }
  }

}

