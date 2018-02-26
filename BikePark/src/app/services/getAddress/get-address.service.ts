import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from "@angular/common/http";

@Injectable()
export class GetAddressService {

  constructor(private http: HttpClient) { }

  getAddress (latLng) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append('Access-Control-Allow-Origin','*');
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=AIzaSyB65iaJJiE2r_pULN6ltUVZqgY9HshHWqA`,{headers: headers});
  }
}

