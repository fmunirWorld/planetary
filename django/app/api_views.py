from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.pagination import LimitOffsetPagination
import os

from app.serializers import PlanetSerializer, SatelliteSerializer
from app.models import Planet, Satellite


@api_view(['GET'])
def index(request):
    app_name = os.getenv("DJ_APP_NAME")
    if app_name:
        return Response({'message': f'Hello from {app_name} running in a Docker container behind Nginx!'})
    return Response({'message': 'Hello from Django!'})


class PlanetsPagination(LimitOffsetPagination):
    default_limit = 3
    max_limit = 10


class PlanetsList(ListAPIView):
    queryset = Planet.objects.all()
    serializer_class = PlanetSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('planet_id',)
    search_fields = ('planet_name',)
    pagination_class = PlanetsPagination


class PlanetCreate(CreateAPIView):
    serializer_class = PlanetSerializer


class PlanetDestroy(DestroyAPIView):
    queryset = Planet.objects.all()
    lookup_field = 'planet_id'
    serializer_class = PlanetSerializer


class PlanetRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Planet.objects.all()
    lookup_field = 'planet_id'
    serializer_class = PlanetSerializer


class SatellitesPagination(LimitOffsetPagination):
    default_limit = 3
    max_limit = 10


class SatellitesList(ListAPIView):
    queryset = Satellite.objects.all()
    serializer_class = SatelliteSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('satellite_id',)
    search_fields = ('satellite_name',)
    pagination_class = SatellitesPagination


class SatelliteCreate(CreateAPIView):
    serializer_class = SatelliteSerializer


class SatelliteRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Satellite.objects.all()
    lookup_field = 'satellite_id'
    serializer_class = SatelliteSerializer
