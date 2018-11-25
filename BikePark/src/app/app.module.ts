import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BikeDataViewComponent } from './components/bike-data-view/bike-data-view.component';
import { GetBikeDataService } from "./services/getBikeData/get-bike-data.service";
import { GetAddressService } from "./services/getAddress/get-address.service";
import { HttpClientModule } from "@angular/common/http";

import {AgmCoreModule, GoogleMapsAPIWrapper} from "@agm/core";

@NgModule({
  declarations: [
    AppComponent,
    BikeDataViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'xxxxxxxxxxx'
    })
  ],
  providers: [GetBikeDataService, GoogleMapsAPIWrapper, GetAddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
