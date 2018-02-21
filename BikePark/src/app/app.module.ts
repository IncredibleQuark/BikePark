import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BikeDataViewComponent } from './components/bike-data-view/bike-data-view.component';
import { GetBikeDataService } from "./services/getBikeData/get-bike-data.service";
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    BikeDataViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GetBikeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
