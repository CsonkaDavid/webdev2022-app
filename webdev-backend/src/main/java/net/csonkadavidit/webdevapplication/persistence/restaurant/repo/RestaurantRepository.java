package net.csonkadavidit.webdevapplication.persistence.restaurant.repo;

import net.csonkadavidit.webdevapplication.persistence.restaurant.data.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Integer> {
}
