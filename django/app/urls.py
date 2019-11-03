from django.urls import path
import app.api_views

app_name = 'app'

urlpatterns = [
    path('', app.api_views.index, name='index'),
    path('planets', app.api_views.PlanetsList.as_view(), name='planets-list'),
    path('planets/new', app.api_views.PlanetCreate.as_view(), name='new-planet'),
    path('planets/<int:planet_id>/destroy', app.api_views.PlanetDestroy.as_view(), name='destroy-planet'),
    path('planets/<int:planet_id>', app.api_views.PlanetRetrieveUpdateDestroy.as_view(), name='planet-detail'),

    path('satellites', app.api_views.SatellitesList.as_view(), name='satellites-list'),
    path('satellites/new', app.api_views.SatelliteCreate.as_view(), name='new-satellite'),
    path('satellites/<int:satellite_id>',
         app.api_views.SatelliteRetrieveUpdateDestroy.as_view(),
         name='satellite-detail'),
]
