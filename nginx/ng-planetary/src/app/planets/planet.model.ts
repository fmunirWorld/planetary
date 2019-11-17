import {Satellite} from './satellite.model';

export class Planet {
  public planetId: number;
  public planetName: string;
  public homeStar: string;
  public mass: number;
  public radius: number;
  public distance: number;
  public satellites: Satellite[];

  constructor(planetId: number, planetName: string, homeStar: string, mass: number,
              radius: number, distance: number, satellites: Satellite[]) {
    this.planetId = planetId;
    this.planetName = planetName;
    this.homeStar = homeStar;
    this.mass = mass;
    this.radius = radius;
    this.distance = distance;
    this.satellites = satellites;
  }
}
