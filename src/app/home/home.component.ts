import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {CacheService} from '../services/cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private cacheService: CacheService,
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    const cachedRecords = this.cacheService.getRecords();
    let numSuccess = 0;
    if (cachedRecords && cachedRecords.length > 0) {
      cachedRecords.forEach(r => {
        this.apiService.addSample(r).subscribe(() => {
          numSuccess++;
          console.log('cachedRecords', cachedRecords);
          console.log('numSuccess', numSuccess);

          if (numSuccess === cachedRecords.length) {
            console.log('Cache cleared.');
            this.cacheService.clearCache();
          }
        }, error => {
          console.log('Cannot connect to server. Cache not cleared.');
        });
      });
    } else {
      console.log('No cached records to upload.');
    }
  }

}
