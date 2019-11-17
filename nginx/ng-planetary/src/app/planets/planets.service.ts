import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private BASE_URL = 'http://localhost/flask';

  constructor(private http: HttpClient) { }

  public getPlanets() {
    return this.http.get(this.BASE_URL + '/planets');
  }

}
