package net.csonkadavidit.webdevapplication.persistence.restaurant.repo;

import net.csonkadavidit.webdevapplication.persistence.restaurant.data.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    Optional<Restaurant> findByName(String name);
}
