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

  constructor(
    private depositService: ApiService) {
  }
  

  addDeposit(): void {
    this.newDeposit.date_added = this.date_temp.toLocaleDateString();

    this.depositService.addDeposit(this.newDeposit).subscribe(deposit => this.depositList.push(deposit))
  }

  current_page: number = 0;
  
  pageSize: number = 10;
  pageSizeOptions: number[] = [10,20,50,100];

  updatePage(event: PageEvent) {
    this.current_page = event.pageIndex;
    this.depositService.getDeposits(this.current_page).subscribe(searchResult => this.depositList = searchResult);
  }
  
  ngOnInit(): void {
    this.depositService.getDeposits(0).subscribe(searchResult => this.depositList = searchResult);
  }

}
