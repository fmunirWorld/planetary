package com.example.planetary.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "satellite")
public class Satellite implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer satelliteId;

    @Column(name = "satellite_name")
    private String satelliteName;

    @Column(name = "is_regular")
    private Boolean isRegular;

    @Column(name = "radius")
    private Double radius;

    @Column(name = "discovery_year")
    private Integer discoveryYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "planet_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Planet planet;

    protected Satellite() {}

    public Satellite(String satelliteName, Boolean isRegular, Double radius, Integer discoveryYear, Planet planet) {
        this.satelliteName = satelliteName;
        this.isRegular = isRegular;
        this.radius = radius;
        this.discoveryYear = discoveryYear;
        this.planet = planet;
    }

    public Integer getSatelliteId() {
        return satelliteId;
    }

    public String getSatelliteName() {
        return satelliteName;
    }

    public Boolean getRegular() {
        return isRegular;
    }

    public Double getRadius() {
        return radius;
    }

    public Integer getDiscoveryYear() {
        return discoveryYear;
    }

    public Planet getPlanet() {
        return planet;
    }

    @Override
    public String toString() {
        return "Satellite{" +
                "satelliteId=" + satelliteId +
                ", satelliteName='" + satelliteName + '\'' +
                ", isRegular=" + isRegular +
                ", radius=" + radius +
                ", discoveryYear=" + discoveryYear +
                ", planet=" + planet +
                '}';
    }
}
