import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://10.0.2.2:8081/api/' //for default avd
//let apiUrl = 'http://localhost:8081/api/' //for browser debuging
//let apiUrl = 'http://10.0.3.2:8081/api/' //for genymotion emulator

@Injectable()
export class CrudProvider {

  constructor(public http:Http) {
    console.log('Hello CategoryProvider Provider');
  }

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

  getData(type,param='') {
    return new Promise((resolve,reject) => {
      let headers = new Headers();
      if(param==''){
        this.http.get(apiUrl + type)
        .subscribe(res=>{
          resolve(res.json()); 
          console.log(res.json)
        }, (err) => {
          reject(err);
          console.log(err)
        });
      } else {
        this.http.get(apiUrl + type +'/'+ param)
        .subscribe(res=>{
          resolve(res.json()); 
          console.log('hasile'+res.json)
        }, (err) => {
          reject(err);
          console.log('hasile'+err)
        });
      }
    });
  }

  deleteData(type,param){
    return new Promise((resolve,reject) => {
      //http request
      this.http.delete(apiUrl + type+'/'+param)
      .subscribe(res=>{
        resolve(res.json()); 
      }, (err) => {
        reject(err);
      });
    });
  }

}
