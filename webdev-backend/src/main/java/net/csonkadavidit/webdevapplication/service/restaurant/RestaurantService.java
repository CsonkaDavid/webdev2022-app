package net.csonkadavidit.webdevapplication.service.restaurant;


import net.csonkadavidit.webdevapplication.persistence.restaurant.data.RestaurantCategoryDto;
import net.csonkadavidit.webdevapplication.persistence.restaurant.data.RestaurantDto;

import java.util.List;
import java.util.Optional;

public interface RestaurantService {
    List<RestaurantCategoryDto> getAllRestaurantCategories();
    List<RestaurantDto> getAllRestaurants();
    Optional<RestaurantDto> addRestaurant(String name, Integer deliveryPrice, List<String> categories);
}
