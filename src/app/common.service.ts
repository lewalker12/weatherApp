import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }

  getUser(username): Promise<any> {

    return this.http.get('http://localhost:4000/getUser?username='+username).toPromise().then((response: any) => { 
      if (!response.ui) {
        this.addUser(username);
        return Promise.resolve('created');
      } else {
        return Promise.resolve(response);
      }
    })

  }

  getLocations(username): Promise<any> {
    return this.http.get('http://localhost:4000/getLocations?username='+username).toPromise().then((response: any) => {
      return Promise.resolve(response);
    })

  }

  addUser(username){
    let body = {
      username: username
    };
    return this.http.post('http://localhost:4000/addUser',body).subscribe((response) => { console.log(response); })
  }

  updateUser(username, location){
    let body = {
      username: username,
      location: location
    }
    return this.http.post('http://localhost:4000/updateUser', body).subscribe((response) => {console.log(response);})
  }
}