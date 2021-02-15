import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service'
import { PageEvent } from '@angular/material/paginator'
import { ApiService } from '../services/api.service';
import { InventoryDeposit } from "../models/deposit.interface";
import { SearchForm } from '../models/search_form'
@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {
  depositList: InventoryDeposit[] = [];
  newDeposit: InventoryDeposit = {
    amount: 0,
    date_added: "",
    notes: ''
  };
  date_temp = new Date(Date.now());
  notify_data : Array<Array<number>>[] = [];
  constructor(
    private depositService: ApiService,
    private graphService: GraphService) {
  }


  form: SearchForm = {
    start_date: "10/05/2020",
    end_date: new Date().toLocaleDateString(),
    student_id: "",
    location: "",
    compute_id: "",
    include_tests: false
  };

  remainingLabels: number;

  topBarData: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];
  addDeposit(): void {
    this.newDeposit.date_added = this.date_temp.toLocaleDateString();

    this.depositService.addDeposit(this.newDeposit).subscribe();
    this.loadPage(0);
  }

  current_page: number = 0;
  
  pageSize: number = 10;
  pageSizeOptions: number[] = [10,20,50,100];
  displayedColumns: string[] = ['position', 'name', 'weight'];

  changePage(event: PageEvent) {
    this.current_page = event.pageIndex;
    this.depositService.getDeposits(this.current_page).subscribe(searchResult => this.depositList = searchResult);
  }
  loadPage(event: number) {
    this.current_page = event;
    this.depositService.getDeposits(this.current_page).subscribe(searchResult => this.depositList = searchResult);
    this.graphService.getTopBarData(this.form).subscribe(tempData => {
      this.topBarData = tempData;
    });
  }

  next(){
    if (this.depositList.length > 0){
    this.current_page += 1; 
    this.loadPage(this.current_page);
  }
  }

  prev(){
    if (this.current_page > 0){
      this.current_page -= 1; 
      this.loadPage(this.current_page);
    }
  }
  
  ngOnInit(): void {
  
    this.loadPage(0);  
  }

}
