from django.db import models


class Planet(models.Model):
    planet_id = models.AutoField(primary_key=True)
    planet_name = models.CharField(max_length=255, null=False, blank=False)
    home_star = models.CharField(max_length=100, null=False, blank=False)
    mass = models.FloatField()
    radius = models.FloatField()
    distance = models.FloatField()

    def __str__(self):
        return f'Planet object : <{self.planet_id} - {self.planet_name}>'

    class Meta:
        db_table = 'planet'


class Satellite(models.Model):
    satellite_id = models.AutoField(primary_key=True)
    satellite_name = models.CharField(max_length=255, null=False, blank=False)
    is_regular = models.BinaryField(default=False)
    radius = models.FloatField()
    discovery_year = models.IntegerField()

    planet = models.ForeignKey(Planet, related_name='satellites', on_delete=models.CASCADE)

    def __str__(self):
        return f'Satellite object : {self.satellite_id} - {self.satellite_name}'

    class Meta:
        db_table = 'satellite'
