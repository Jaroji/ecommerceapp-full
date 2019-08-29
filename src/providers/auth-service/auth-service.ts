import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://10.0.2.2:8081/api/' //for default avd
//let apiUrl = 'http://localhost:8081/api/' //for browser debuging
//let apiUrl = 'http://10.0.3.2:8081/api/' //for genymotion emulator

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  //method yang digunakan untuk menangani HTTP request
  postData(data,type){
    return new Promise((resolve,reject) => {
      let headers = new Headers(
        {
          'Content-Type' : 'application/json'
        }
      );
      //http request
      this.http.post(apiUrl + type, data, {headers:headers})
      .subscribe(res=>{
        resolve(res.json()); 
      }, (err) => {
        reject(err);
      });
    });
  }
}
