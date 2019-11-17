import { Component, OnInit } from '@angular/core';
import {Planet} from './planet.model';
import {PlanetsService} from './planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

  constructor(private planetsService: PlanetsService) { }

  ngOnInit() {
    this.planetsService.getPlanets().subscribe((planets) => console.log(planets));
  }

}
