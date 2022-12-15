package net.csonkadavidit.webdevapplication.controller;

import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.restaurant.data.RestaurantCategoryDto;
import net.csonkadavidit.webdevapplication.persistence.restaurant.data.RestaurantDto;
import net.csonkadavidit.webdevapplication.service.restaurant.RestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurant")
@CrossOrigin
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping("/categories")
    public ResponseEntity<List<RestaurantCategoryDto>> getRestaurantCategories() {
        List<RestaurantCategoryDto> restaurantCategoryDtoList = restaurantService.getAllRestaurantCategories();

        return ResponseEntity.status(HttpStatus.OK).body(restaurantCategoryDtoList);
    }

    @GetMapping("/restaurants")
    public ResponseEntity<List<RestaurantDto>> getRestaurants() {
        List<RestaurantDto> restaurantDtoList = restaurantService.getAllRestaurants();

        return ResponseEntity.status(HttpStatus.OK).body(restaurantDtoList);
    }


    @PostMapping("/add/restaurant")
    public ResponseEntity<String> addRestaurant(
            @RequestParam String name,
            @RequestParam Integer deliveryPrice,
            @RequestParam List<String> categories
            ) {

        Optional<RestaurantDto> newRestaurant = restaurantService.addRestaurant(name, deliveryPrice, categories);

        if(newRestaurant.isPresent())
            return ResponseEntity.status(HttpStatus.OK).body("New Restaurant created");
        else
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
    }

    @PostMapping("/delete/restaurant")
    public ResponseEntity<String> deleteRestaurant(@RequestParam String name) {

        Optional<RestaurantDto> newRestaurant = restaurantService.deleteRestaurant(name);

        if(newRestaurant.isPresent())
            return ResponseEntity.status(HttpStatus.OK).body("Restaurant deleted");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
