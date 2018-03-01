import {Component, OnInit} from '@angular/core';
import {GetBikeDataService} from "../../services/getBikeData/get-bike-data.service";
import {GetAddressService} from "../../services/getAddress/get-address.service";
import {} from '@types/googlemaps';
import * as _ from 'lodash';

@Component({
  selector: 'app-bike-data-view',
  templateUrl: './bike-data-view.component.html',
  styleUrls: ['./bike-data-view.component.css']
})

export class BikeDataViewComponent implements OnInit {

  loaded: boolean;
  private userPosition: any;
  private BikePark: any;
  private parkLat: number;
  private parkLng: number;
  private userLat: number;
  private userLng: number;
  private map: any;

  constructor(private GetBikeDataService: GetBikeDataService,
              private GetAddressService: GetAddressService) {
  }

  ngOnInit() {
    this.loaded = false;
    this.getUserPosition();
    this.loadData();
  }

  loadData() {
    this.GetBikeDataService.getBikeData().subscribe((data: any) => {
      this.BikePark = data.features;

      //just initial position on the map
      this.parkLat = this.BikePark[0].geometry.coordinates[1];
      this.parkLng = this.BikePark[0].geometry.coordinates[0];


      _.forEach(data.features, (item) => {

        if (this.userPosition) {
          item.distance = this.calculateDistance(item.geometry.coordinates[1], item.geometry.coordinates[0]);
        } else {
          item.distance = '';
        }

        const latLng: string = `${item.geometry.coordinates[1]}, ${item.geometry.coordinates[0]}`;

        this.GetAddressService.getAddress(latLng).subscribe((data: any) => {

          let res = data.results[0];
          if (res) {
            item.address = res.formatted_address
          } else {
            item .address = 'Poznań, somewhere';
            console.warn('Probably api requests limit exceeded');
          }

        }, (err) => {
          console.warn(err);
        });
      });

      this.loaded = true;

    }, (err) => {
      console.error('something went wrong', err);
    });
  }


  getUserPosition() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(this.setUserPosition.bind(this), (err) => {
        console.warn('There is no user location');
      });
    }
  }

  setUserPosition(pos) {
    this.userPosition = pos;
    this.userLat = this.userPosition.coords.latitude;
    this.userLng = this.userPosition.coords.longitude;
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

  public storeMapReady(map){
    this.map = map;
    this.map.fitBounds(this.findStoresBounds());

    if (!this.userPosition) {
      google.maps.event.addListenerOnce(map, 'bounds_changed', (event) => {
        map.setZoom(15);
      });
    }

  }

  public findStoresBounds(){
      let bounds:any = new google.maps.LatLngBounds();

      if (this.userPosition) {
        bounds.extend(new google.maps.LatLng(this.userLat, this.userLng));
      }
      bounds.extend(new google.maps.LatLng(this.parkLat, this.parkLng));

    return bounds;
  }

  toggleMap(event) {
    const id = event.currentTarget.id;
    this.parkLat = this.BikePark[id].geometry.coordinates[1];
    this.parkLng = this.BikePark[id].geometry.coordinates[0];
  }

}
