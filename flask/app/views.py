from flask import jsonify, request, make_response
from marshmallow.exceptions import ValidationError
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

from app import app

migrate = Migrate(compare_type=True)

# Load env vars
APP_ROOT = os.path.join(os.path.dirname(__file__), '..')
dotenv_path = os.path.join(APP_ROOT, '.env')
load_dotenv(dotenv_path)

DB_CONN_STR = os.getenv('DB_CONN_STR')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://' + DB_CONN_STR + '?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['secret_key'] = os.getenv('SECRET_KEY')

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate.init_app(app)


class Planet(db.Model):
    __tablename__ = 'planet'

    planet_id = db.Column(db.Integer, primary_key=True)
    planet_name = db.Column(db.String, nullable=False)
    home_star = db.Column(db.String, nullable=False)
    mass = db.Column(db.Float)
    radius = db.Column(db.Float)
    distance = db.Column(db.Float)

    def __str__(self):
        return self.planet_name


class Satellite(db.Model):
    __tablename__ = 'satellite'

    satellite_id = db.Column(db.Integer, primary_key=True)
    satellite_name = db.Column(db.String, nullable=False)
    is_regular = db.Column(db.Boolean)
    radius = db.Column(db.Float)
    discovery_year = db.Column(db.Integer, nullable=False)

    planet_id = db.Column(db.Integer, db.ForeignKey('planet.planet_id'))
    planet = db.relationship(Planet, backref='satellites')

    def __str__(self):
        return self.satellite_name


class PlanetSchema(ma.ModelSchema):
    class Meta:
        model = Planet
        dump_only = ('satellites', '_links')

    # satellites = ma.Nested(SatelliteSchema, many=True)
    satellites = ma.List(ma.HyperlinkRelated("satellite_detail"))

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("planet_detail", id="<planet_id>"),
            "collection": ma.URLFor("planets")
        }
    )


class SatelliteSchema(ma.ModelSchema):
    class Meta:
        model = Satellite
        load_only = ('planet_id',)
        dump_only = ('_links',)

    planet = ma.HyperlinkRelated('planet_detail')

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("satellite_detail", id="<satellite_id>"),
            "collection": ma.URLFor("satellites")
        }
    )


planet_schema = PlanetSchema()
planets_schema = PlanetSchema(many=True)

satellite_schema = SatelliteSchema()
satellites_schema = SatelliteSchema(many=True)


# flask db_create
@app.cli.command('db_create')
def db_create():
    db.create_all()
    print('Database created!')


@app.errorhandler(ValidationError)
def validation_error_handler(err):
    return jsonify(err.messages), 400


@app.errorhandler(KeyError)
def key_error_handler(err):
    return jsonify(message='Missing filed/s.'), 400


@app.errorhandler(RuntimeError)
def runtime_error_handler(err):
    return jsonify(message='Internal server error occurred.'), 500


@app.route('/')
def index():
    # Use os.getenv("key") to get environment variables
    app_name = os.getenv("APP_NAME")

    if app_name:
        return jsonify(message=f"Hello from {app_name} running in a Docker container behind Nginx!")
    return jsonify(message="Hello from Flask")


@app.route('/planets', methods=['GET'])
def planets():
    return make_response(jsonify(planets_schema.dump(Planet.query.all())))


@app.route('/planets', methods=['POST'])
def add_planet():
    planet_json = request.get_json()
    planet_data = Planet.query.filter_by(planet_name=planet_json['planet_name']).first()
    if planet_data:
        return jsonify(message='There is already a planet by that name.'), 409

    planet = planet_schema.load(planet_json)
    db.session.add(planet)
    db.session.commit()
    return make_response(jsonify(planet_schema.dump(planet)), 201)


@app.route('/planets/<int:id>', methods=['GET'])
def planet_detail(id: int):
    planet = Planet.query.filter_by(planet_id=id).first()
    if planet:
        return jsonify(planet_schema.dump(planet))
    else:
        return jsonify(message='That planet does not exist.'), 404


@app.route('/planets/<int:id>/satellites', methods=['GET'])
def planet_satellites(id: int):
    satellites = Satellite.query.filter_by(planet_id=id).all()
    if satellites:
        return jsonify(satellites_schema.dump(satellites))
    else:
        return jsonify(message='That planet does not exist.'), 404


@app.route('/planets/<int:id>', methods=['PUT', 'PATCH'])
def update_planet(id: int):
    planet_json = request.get_json()
    planet = Planet.query.filter_by(planet_id=id).first()
    if planet is None:
        return jsonify(message='That planet does not exist.'), 404

    planet_schema.load(planet_json, instance=planet, partial=True)
    db.session.commit()
    return jsonify(planet_schema.dump(planet)), 202


@app.route('/planets/<int:id>', methods=['DELETE'])
def delete_planet(id: int):
    planet = Planet.query.filter_by(planet_id=id).first()

    if planet is None:
        return make_response({'message': 'That planet does not exists!'}, 404)

    db.session.delete(planet)
    db.session.commit()
    return {'message': 'Planet deleted successfully!'}


@app.route('/satellites', methods=['GET'])
def satellites():
    return jsonify(satellites_schema.dump(Satellite.query.all()))


@app.route('/satellites', methods=['POST'])
def add_satellite():
    satellite_json = request.get_json()
    satellite_data = Satellite.query.filter_by(satellite_name=satellite_json['satellite_name']).first()
    if satellite_data:
        return jsonify(message='There is already a satellite by that name.'), 409

    satellite = satellite_schema.load(satellite_json)
    db.session.add(satellite)
    db.session.commit()
    return make_response(jsonify(satellite_schema.dump(satellite)), 201)


@app.route('/satellites/<int:id>', methods=['GET'])
def satellite_detail(id: int):
    satellite = Satellite.query.filter_by(satellite_id=id).first()
    if satellite:
        return jsonify(satellite_schema.dump(satellite))
    else:
        return jsonify(message='That satellite does not exist.'), 404


@app.route('/satellites/<int:id>', methods=['PUT', 'PATCH'])
def update_satellite(id: int):
    satellite_json = request.get_json()
    satellite = Satellite.query.filter_by(satellite_id=id).first()
    if satellite is None:
        return jsonify(message='That planet does not exist.'), 404

    satellite_schema.load(satellite_json, instance=satellite, partial=True)
    db.session.commit()
    return jsonify(satellite_schema.dump(satellite)), 202


@app.route('/satellites/<int:id>', methods=['DELETE'])
def delete_satellite(id: int):
    satellite = Satellite.query.filter_by(satellite_id=id).first()

    if satellite is None:
        return make_response({'message': 'That satellite does not exists!'}, 404)

    db.session.delete(satellite)
    db.session.commit()
    return make_response({'message': 'Satellite deleted successfully!'}, 200)
