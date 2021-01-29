import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator'
import { ApiService } from '../services/api.service';
import { InventoryDeposit } from "../models/deposit.interface";

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
    private depositService: ApiService) {
  }
  

  addDeposit(): void {
    this.newDeposit.date_added = this.date_temp.toLocaleDateString();

    this.depositService.addDeposit(this.newDeposit).subscribe()
    this.current_page = 0;
    this.depositService.getDeposits(0).subscribe(searchResult => this.depositList = searchResult);
  }

  current_page: number = 0;
  
  pageSize: number = 10;
  pageSizeOptions: number[] = [10,20,50,100];
  displayedColumns: string[] = ['position', 'name', 'weight'];

  updatePage(event: PageEvent) {
    this.current_page = event.pageIndex;
    this.depositService.getDeposits(this.current_page).subscribe(searchResult => this.depositList = searchResult);
  }

  next(){
    if (this.depositList.length > 0){
    this.current_page += 1; 
    this.depositService.getDeposits(this.current_page).subscribe(depositList => this.depositList = depositList);  }}

  prev(){
    if (this.current_page > 0){
      this.current_page -= 1; 
      this.depositService.getDeposits(this.current_page).subscribe(depositList => this.depositList = depositList);
    }
  }
  
  ngOnInit(): void {
    this.depositService.getDeposits(0).subscribe(searchResult => this.depositList = searchResult);
  }

}
