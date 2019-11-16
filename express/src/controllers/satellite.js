import {Satellite} from "../models";

export const getSatellites = (req, res) => {
  Satellite.findAll()
    .then(satellites => res.json(satellites));
};

export const createSatellite = (req, res) => {
  let newSatellite = new Satellite(req.body);
  newSatellite.save()
    .then(satellite => res.status(201).json(satellite));
};

export const getSatellite = (req, res) => {
  Satellite.findByPk(req.params.satelliteId)
    .then(satellite => res.json(satellite));
};

export const updateSatellite = (req, res) => {
  Satellite.update(req.body, {
    where: {satelliteId: req.params.satelliteId}
  })
    .then(result => res.json(result));
};

export const deleteSatellite = (req, res) => {
  Satellite.destroy({
    where: {satelliteId: req.params.satelliteId}
  })
    .then(result => res.status(204).json(result));
};
