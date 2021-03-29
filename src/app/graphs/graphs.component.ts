import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

import { Label } from 'ng2-charts';
import { GraphService } from '../services/graph.service';
import { Sample } from '../models/sample.interface';
import { SearchForm } from '../models/search_form';

import {PageEvent} from '@angular/material/paginator';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})

export class GraphsComponent implements OnInit {

  constructor(private graphService: GraphService) { }

  topBarData: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];
  ChartName = 'Location Activity';
  dailyChartLabels: Label[] = [];
  weekdayChartLabels: Label[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  hourlyChartLabels: Label[] = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 PM'];
  dailyChartsData: ChartDataSets[] = [];
  hourlyChartsData: ChartDataSets[] = [];
  weekdayChartsData: ChartDataSets[] = [];

  barChartPlugins = [pluginDataLabels];
  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        },
        stacked: true
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        stacked: true
      }]
    },
    legend: {
      onClick: (e, i) => {
        if (!this.ChartName.includes('Station')){
        this.form.location = String(i.text);
        }
        else {
          this.form.location = '';
        }
        this.updateGraphData();
      }
    },
    plugins: {
      datalabels: {

        rotation: -45,
        anchor: 'end',
        align: 'end',
        formatter: (value: any, ctx: any) => {

          const datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = 0;
            datasets.map((dataset: any) => {
              sum += dataset.data[ctx.dataIndex];
            });
            return sum;
          } else {
            return '';
          }
        }
      }
    }, layout: {
      padding: {
        left: 0,
        right: 20,
        top: 30,
        bottom: 0
      }
    }
  };
  tempData: JSON = {} as JSON;

  searchResult: Sample[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'text', 'email'];

  startDate: Date = new Date();
  endDate: Date = new Date();

  pageIndex = 0;
  totalItems = 0;

  pageSize = 10;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  form: SearchForm = {
    startDate: '',
    endDate: '',
    studentId: '',
    location: '',
    computeId: '',
    includeTests: false
  };

  updatePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageIndex = event.pageIndex;
    this.graphService.getRawSearchData(this.form, this.pageIndex, this.pageSize).subscribe(
      searchResult => {this.searchResult = searchResult;
    });
  }

  cancelEvent(event) {
    event.preventDefault();
  }

  searchToday(): void {
    this.startDate = new Date();
    this.endDate = new Date();
    this.updateGraphData();
  }

  searchAll(): void {
    this.startDate = new Date(2020, 9, 5);
    this.endDate = new Date();
    this.updateGraphData();
  }

  downloadSearchResults(): void {
    this.graphService.downloadSearchResults(this.form);
  }

  updateGraphData(): void {
    if (this.form.location.trim().split(' ').length === 1) {
      this.ChartName = 'Total Samples per Station @ Location ' + this.form.location;
    } else {
      this.ChartName = 'Total Samples per Location';
    }
    if (this.form.location.trim() === '') {
      this.ChartName = 'Total Samples per Location';
    }

    this.form.startDate = this.startDate.toLocaleDateString();
    this.form.endDate = this.endDate.toLocaleDateString();

    const temp = new Date(this.startDate.getTime());
    this.dailyChartLabels = [];
    while (true) {
      this.dailyChartLabels.push(temp.toLocaleDateString());
      if (temp.toLocaleDateString() === this.endDate.toLocaleDateString()) {
        break;
      } else {
        temp.setDate(temp.getDate() + 1);
      }
    }

    this.graphService.getDayData(this.form).subscribe(tempData => {
      this.tempData = tempData;
      this.dailyChartsData = [];
      Object.entries(this.tempData).forEach(([LOC_OR_STAT_NAME, totals]) => {
        this.dailyChartsData.push({ data: totals, label: LOC_OR_STAT_NAME, stack: 'a' });
      });
    });

    this.graphService.getWeekdayData(this.form).subscribe(tempData => {
      this.tempData = tempData;
      this.weekdayChartsData = [];
      Object.entries(this.tempData).forEach(([LOC_OR_STAT_NAME, totals]) => {
        this.weekdayChartsData.push({ data: totals, label: LOC_OR_STAT_NAME, stack: 'a' });
      });
    });

    this.graphService.getHourData(this.form).subscribe(tempData => {
      this.tempData = tempData;
      this.hourlyChartsData = [];
      Object.entries(this.tempData).forEach(([LOC_OR_STAT_NAME, totals]) => {
        this.hourlyChartsData.push({ data: totals, label: LOC_OR_STAT_NAME, stack: 'c' });
      });
    });

    this.graphService.getTopBarData(this.form).subscribe(tempData => {
      this.topBarData = tempData;
      this.totalItems = this.topBarData[0];
    });
    this.graphService.getRawSearchData(this.form, 0, this.pageSize).subscribe(searchResult => this.searchResult = searchResult);
  }

  ngOnInit(): void {
    const endDate = new Date();
    const startDate = new Date();
    this.form.startDate = startDate.toLocaleDateString();
    this.form.endDate = endDate.toLocaleDateString();
    this.updateGraphData();
  }

  chartClicked(e: any): void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if (activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(clickedElementIndex, label, value);
        // this.updateGraphData();
      }
    }
  }

}
