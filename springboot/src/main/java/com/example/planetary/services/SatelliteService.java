package com.example.planetary.services;

import com.example.planetary.repos.PlanetRepository;
import com.example.planetary.repos.SatelliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SatelliteService {
    private SatelliteRepository satelliteRepository;
    private PlanetRepository planetRepository;

    @Autowired
    public SatelliteService(SatelliteRepository satelliteRepository) {
        this.satelliteRepository = satelliteRepository;
    }
}
