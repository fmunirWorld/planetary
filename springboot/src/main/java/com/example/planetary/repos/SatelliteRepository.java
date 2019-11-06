package com.example.planetary.repos;

import com.example.planetary.models.Satellite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SatelliteRepository extends JpaRepository<Satellite, Integer> {
}
