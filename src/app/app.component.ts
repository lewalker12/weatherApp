import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  locations: string[] = [];
  signedIn: boolean = false;
  username: string;

  constructor(private api:CommonService) {}

  ngOnInit() {

  }

  public signInUser(user: string) {
    this.api.getUser(user).then((response) => {
      if (response === 'created') {
        this.username = user;
        this.signedIn = true;
      } else {
        this.username = user;
        this.signedIn = true;
        this.api.getLocations(user).then((locations) => {
          this.addLocation(locations.location);
        })
      }
    });
  }

  public signOut() {
    this.username = null;
    this.signedIn = false;
  }

  public addLocation(location:string) {
    if (!this.locations.includes(location)) {
      this.api.updateUser(this.username, location);
      this.locations.push(location);
    }
  }
}
