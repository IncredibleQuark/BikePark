import {Component, OnInit} from '@angular/core';
import {GetBikeDataService} from "../../services/getBikeData/get-bike-data.service";
import {GetAddressService} from "../../services/getAddress/get-address.service";
import {} from '@types/googlemaps';
import {MapsAPILoader} from "@agm/core";
import {GoogleMapsAPIWrapper} from "@agm/core";
import * as _ from 'lodash';

declare var google: any;


@Component({
  selector: 'app-bike-data-view',
  templateUrl: './bike-data-view.component.html',
  styleUrls: ['./bike-data-view.component.css']
})
export class BikeDataViewComponent implements OnInit {


  private loaded: boolean;
  private opened: boolean;
  private userPosition: any;

  BikePark: any;

  constructor(private GetBikeDataService: GetBikeDataService,
              private GetAddressService: GetAddressService,
              private mapsApiLoader: MapsAPILoader,
              private gmapsApi: GoogleMapsAPIWrapper) {
  }

  ngOnInit() {
    this.loaded = false;

    this.getUserPosition();

    this.GetBikeDataService.getBikeData().subscribe((data: any) => {
      this.BikePark = data.features;

      if (this.userPosition) {
        _.forEach(data.features, (item) => {
          item.distance = this.calculateDistance(item.geometry.coordinates[1], item.geometry.coordinates[0]);

          const latLng: string = `${item.geometry.coordinates[1]}, ${item.geometry.coordinates[0]}`;

          this.GetAddressService.getAddress(latLng).subscribe((data: any) => {
            let res = data.results[0];
            if (res) {
              item.address = res.formatted_address
            } else {
              item .address = 'Poznań, somewhere';
            }

          }, (err) => {
            console.warn('Probably api requests limit exceeded', err);
          });
        });

      } else {
        this.getUserPosition();
      }

      console.log(data);
      this.loaded = true;

    }, (err) => {
      console.error('something went wrong', err);
    });

  }


  getUserPosition() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(this.setUserPosition.bind(this));
    }
  }

  setUserPosition(pos) {
    this.userPosition = pos;
  }

  calculateDistance(lat2: number, long2: number) {

    let lat1 = this.userPosition.coords.latitude;
    let long1 = this.userPosition.coords.longitude;

    //this is some function from stackoverflow normally it would be replaced with google maps directions
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return Math.round(dis * 100) / 100;
  }

  toggleMap() {
    this.opened = !this.opened;
    this.gmapsApi.getNativeMap().then(map => {
      console.warn(map.getBounds());
    }, (err) => {
      console.warn(err);
    });
  }

}
