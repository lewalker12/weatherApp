import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'banner-component',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  constructor(private app:AppComponent) {}

  signOut() {
    this.app.signOut();
  }
}
