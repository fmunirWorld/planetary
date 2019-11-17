import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Planet} from './planet.model';
import {PlanetsService} from './planets.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Planet>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  showProgressBar = true;

  constructor(private planetsService: PlanetsService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.displayedColumns = ['index', 'serial', 'planetName', 'homeStar', 'mass', 'radius', 'distance', 'noOfSatellites', 'actions'];
    this.planetsService.getPlanets()
      .subscribe((resp: any[]) => {
        const planets: Planet[] = [];
        for ( let i = 0, l = resp.length; i < l; i++ ) {
          planets.push(new Planet(
            resp[i].planet_id,
            resp[i].planet_name,
            resp[i].home_star,
            resp[i].mass,
            resp[i].radius,
            resp[i].distance,
            resp[i].satellites.length
          ));
        }
        this.dataSource = new MatTableDataSource(planets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showProgressBar = false;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddPlanetDialogComponent, {
      width: '415px',
      data: new NewPlanetData()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.planetsService.addPlanet(JSON.parse(JSON.stringify({
        planet_name: result.planetName,
        home_star: result.homeStar,
        mass: result.mass,
        radius: result.radius,
        distance: result.distance
      })))
        .subscribe(resp => {
          let message = null;
          if (resp.status === 201) {
            const respBody: any = resp.body;
            this.dataSource.data.push(new Planet(
              respBody.planet_id,
              respBody.planet_name,
              respBody.home_star,
              respBody.mass,
              respBody.radius,
              respBody.distance,
              respBody.satellites.length
            ));
            this.dataSource._updateChangeSubscription();
            message = 'Planet added successfully!';
          } else {
            message = 'Oops! Something went wrong.';
          }
          this.openSnackBar(message, 3);
        });
    });
  }

  deletePlanet(planet: Planet) {
    this.planetsService.deletePlanet(planet.planetId)
      .subscribe(resp => {
        let message = null;
        if (resp.status === 204) {
          message = 'Planet deleted successfully!';
        } else {
          message = 'Oops! Something went wrong.';
        }
        this.openSnackBar(message, 3);
      });
    const index = this.dataSource.data.indexOf(planet);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  private openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, null, {
      duration: duration * 1000
    });
  }

}

export class NewPlanetData {
  planetName: string;
  homeStar: string;
  mass: number;
  radius: number;
  distance: number;
}

@Component({
  selector: 'app-add-planet-dialog',
  templateUrl: './add-planet-dialog.component.html'
})
export class AddPlanetDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddPlanetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: NewPlanetData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
