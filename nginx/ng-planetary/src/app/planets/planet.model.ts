export class Planet {
  constructor(
    public planetId: number,
    public planetName: string,
    public homeStar: string,
    public mass: number,
    public radius: number,
    public distance: number,
    public noOfSatellites: number
  ) {}
}
