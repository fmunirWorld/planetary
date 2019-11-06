package com.example.planetary.repos;

import com.example.planetary.models.Planet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanetRepository extends JpaRepository<Planet, Integer> {
}
