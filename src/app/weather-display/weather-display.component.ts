import { Component, Input } from '@angular/core';
import { ApixuService } from '../apixu.service';

@Component({
  selector: 'weather-display-component',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent {
    @Input() location: string; 

    data: any;
    isLoading:boolean = true;

    constructor(private apixuService:ApixuService){}

    ngOnInit() {
        this.apixuService.getWeather(this.location).subscribe(data => {
            if (Object.keys(data).length === 3) {
                this.data = data;
                this.isLoading = false;
            }
        });
    }
}
