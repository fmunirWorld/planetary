import {
  getPlanets,
  createPlanet,
  getPlanet,
  updatePlanet,
  deletePlanet
} from "../controllers/planet";

import {
  getSatellites,
  createSatellite,
  getSatellite,
  updateSatellite,
  deleteSatellite
} from "../controllers/satellite";

const routes = (app) => {
  app.route('/planets')
    .get((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Method type: ${req.method}`);
      next();
    }, getPlanets)
    .post(createPlanet);

  app.route('/planets/:planetId')
    .get(getPlanet)
    .put(updatePlanet)
    .delete(deletePlanet);

  app.route('/satellites')
    .get(getSatellites)
    .post(createSatellite);

  app.route('/satellites/:satelliteId')
    .get(getSatellite)
    .put(updateSatellite)
    .delete(deleteSatellite);
};

export default routes;
