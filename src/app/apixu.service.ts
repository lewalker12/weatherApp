import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location){
    return this.http.get(
        'http://api.weatherstack.com/current?access_key=958ad1257d2613b38b6e32cbe3a82877&query=' + location
    );
  }
}
