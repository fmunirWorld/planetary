export class Satellite {
  public satelliteId: number;
  public satelliteName: string;
  public isRegular: boolean;
  public radius: number;
  public discoveryYear: number;

  constructor(satelliteId: number, satelliteName: string, isRegular: boolean, radius: number, discoveryYear: number) {
    this.satelliteId = satelliteId;
    this.satelliteName = satelliteName;
    this.isRegular = isRegular;
    this.radius = radius;
    this.discoveryYear = discoveryYear;
  }
}
