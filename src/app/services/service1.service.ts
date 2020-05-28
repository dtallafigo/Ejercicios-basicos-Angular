import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subscription} from 'rxjs';
import {Persona} from '../app.component';

@Injectable({
  providedIn: 'root'
})

export class Service1Service {
  constructor(private http: HttpClient) {
  }



  getDataSource() {
    return this.http.get(this.dataSourceURL);
  }
}
