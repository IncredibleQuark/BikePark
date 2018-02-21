import { Component, OnInit } from '@angular/core';
import { GetBikeDataService } from "../../services/getBikeData/get-bike-data.service";
import { HttpClient, HttpHeaders} from "@angular/common/http";
@Component({
  selector: 'app-bike-data-view',
  templateUrl: './bike-data-view.component.html',
  styleUrls: ['./bike-data-view.component.css']
})
export class BikeDataViewComponent implements OnInit {

  private loaded: boolean;
  BikePark: any;

  constructor(private GetBikeDataService: GetBikeDataService, private http: HttpClient) { }

  ngOnInit() {
    this.loaded = false;

    this.GetBikeDataService.getBikeData().subscribe( (data:any) => {
      this.BikePark = data.features;
      this.loaded = true;
      console.log(data);
    });

  }

}
