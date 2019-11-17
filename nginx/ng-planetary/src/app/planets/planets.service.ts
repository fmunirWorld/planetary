import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private BASE_URL = `http://${window.location.hostname}/flask`;

  constructor(private http: HttpClient) { }

  public getPlanets() {
    return this.http.get(`${this.BASE_URL}/planets`);
  }

  public addPlanet(body: JSON) {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post(`${this.BASE_URL}/planets`, body, {
      headers,
      observe: 'response'
    });
  }

  public deletePlanet(planetId: number) {
    return this.http.delete(
      `${this.BASE_URL}/planets/${planetId}`,
      { observe: 'response' }
    );
  }
}
