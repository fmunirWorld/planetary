from rest_framework import serializers
from app.models import Planet, Satellite


class SatelliteSerializer(serializers.ModelSerializer):
    planet_link = serializers.HyperlinkedIdentityField(view_name='app:planet-detail', lookup_field='planet_id')

    class Meta:
        model = Satellite
        fields = ('satellite_id', 'satellite_name', 'is_regular', 'radius', 'discovery_year', 'planet', 'planet_link')


class PlanetSerializer(serializers.ModelSerializer):
    satellites = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='app:satellite-detail',
        lookup_field='satellite_id'
    )

    class Meta:
        model = Planet
        fields = ('planet_id', 'planet_name', 'home_star', 'mass', 'radius', 'distance', 'satellites')
