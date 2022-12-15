package net.csonkadavidit.webdevapplication.persistence.restaurant.repo;

import net.csonkadavidit.webdevapplication.persistence.restaurant.data.RestaurantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantCategoryRepository extends JpaRepository<RestaurantCategory, Integer> {
    Optional<RestaurantCategory> findByName(String name);
}
