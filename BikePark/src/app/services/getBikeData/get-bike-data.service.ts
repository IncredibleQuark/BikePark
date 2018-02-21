import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class GetBikeDataService {

  constructor (private http:HttpClient) { }

  //get data from external API
  getBikeData () {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get('http://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=stacje_rowerowe',{headers: headers});
  }
}
