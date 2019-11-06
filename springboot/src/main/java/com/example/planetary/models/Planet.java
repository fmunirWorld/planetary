package com.example.planetary.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Entity(name = "planet")
public class Planet implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer planetId;

    @Column(name = "planet_name")
    private String planetName;

    @Column(name = "home_star")
    private String homeStar;

    @Column(name = "mass")
    private Double mass;

    @Column(name = "radius")
    private Double radius;

    @Column(name = "distance")
    private Double distance;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "planet")
    private Set<Satellite> satellites = new HashSet<>();

    protected Planet() {}

    public Planet(String planetName, String homeStar, Double mass, Double radius, Double distance) {
        this.planetName = planetName;
        this.homeStar = homeStar;
        this.mass = mass;
        this.radius = radius;
        this.distance = distance;
    }

    public Integer getPlanetId() {
        return planetId;
    }

    public String getPlanetName() {
        return planetName;
    }

    public String getHomeStar() {
        return homeStar;
    }

    public Double getMass() {
        return mass;
    }

    public Double getRadius() {
        return radius;
    }

    public Double getDistance() {
        return distance;
    }

    public Set<Satellite> getSatellites() {
        return satellites;
    }

    @Override
    public String toString() {
        return "Planet{" +
                "planetId=" + planetId +
                ", planetName='" + planetName + '\'' +
                ", homeStar='" + homeStar + '\'' +
                ", mass=" + mass +
                ", radius=" + radius +
                ", distance=" + distance +
                '}';
    }
}
