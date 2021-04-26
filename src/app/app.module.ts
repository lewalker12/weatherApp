import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { ApixuService } from './apixu.service';
import { CommonService } from './common.service';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    WeatherDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApixuService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
