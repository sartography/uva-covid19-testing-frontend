import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from '../services/api.service';
import { InventoryDeposit } from '../models/deposit.interface';
import { SearchForm } from '../models/search_form';
@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {
  constructor(
    private depositService: ApiService,
    private graphService: GraphService) {
  }
  depositList: InventoryDeposit[] = [];
  newDeposit: InventoryDeposit = {
    amount: 0,
    date_added: '',
    notes: ''
  };

  dateTemp = new Date(Date.now());


  form: SearchForm = {
    startDate: '10/05/2020',
    endDate: new Date().toLocaleDateString(),
    studentId: '',
    location: '',
    computeId: '',
    includeTests: false
  };

  remainingLabels: number;

  topBarData: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];

  currentPage = 0;

  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  displayedColumns: string[] = ['position', 'name', 'weight'];
  addDeposit(): void {
    this.newDeposit.date_added = this.dateTemp.toLocaleDateString();

    this.depositService.addDeposit(this.newDeposit).subscribe();
    this.loadPage(0);
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.depositService.getDeposits(this.currentPage).subscribe(searchResult => this.depositList = searchResult);
  }

  loadPage(event: number) {
    this.currentPage = event;
    this.depositService.getDeposits(this.currentPage).subscribe(searchResult => this.depositList = searchResult);
    this.graphService.getTopBarData(this.form).subscribe(tempData => {
      this.topBarData = tempData;
    });
  }

  next(){
    if (this.depositList.length > 0){
    this.currentPage += 1;
    this.loadPage(this.currentPage);
  }
  }

  prev(){
    if (this.currentPage > 0){
      this.currentPage -= 1;
      this.loadPage(this.currentPage);
    }
  }

  ngOnInit(): void {

    this.loadPage(0);
  }

}
