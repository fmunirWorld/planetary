import {Planet} from "../models";

export const getPlanets = (req, res) => {
  Planet.findAll({ include: [ 'satellites' ] })
    .then(planets => res.json(planets));
};

export const createPlanet = (req, res) => {
  let newPlanet = new Planet(req.body);
  newPlanet.save()
    .then(planet => res.status(201).json(planet));
};

export const getPlanet = (req, res) => {
  Planet.findByPk(req.params.planetId, { include: [ 'satellites' ] })
    .then(planet => res.json(planet));
};

export const updatePlanet = (req, res) => {
  Planet.update(req.body, {where: {planetId: req.params.planetId}})
    .then(result => res.json(result));
};

export const deletePlanet = (req, res) => {
  Planet.destroy({where: {planetId: req.params.planetId}})
    .then(result => res.status(204).json(result));
};
