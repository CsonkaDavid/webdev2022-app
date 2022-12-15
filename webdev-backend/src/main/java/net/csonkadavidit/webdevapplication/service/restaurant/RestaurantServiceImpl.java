package net.csonkadavidit.webdevapplication.service.restaurant;

import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.restaurant.data.Product;
import net.csonkadavidit.webdevapplication.persistence.restaurant.data.ProductDto;
import net.csonkadavidit.webdevapplication.persistence.restaurant.data.Restaurant;
import net.csonkadavidit.webdevapplication.persistence.restaurant.data.RestaurantCategory;
import net.csonkadavidit.webdevapplication.persistence.restaurant.data.RestaurantCategoryDto;
import net.csonkadavidit.webdevapplication.persistence.restaurant.data.RestaurantDto;
import net.csonkadavidit.webdevapplication.persistence.restaurant.repo.RestaurantCategoryRepository;
import net.csonkadavidit.webdevapplication.persistence.restaurant.repo.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService{

    private final RestaurantRepository restaurantRepository;
    private final RestaurantCategoryRepository restaurantCategoryRepository;

    @Override
    public List<RestaurantCategoryDto> getAllRestaurantCategories() {
        return restaurantCategoryRepository.findAll().stream()
                .map(this::convertRestaurantCategoryToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RestaurantDto> getAllRestaurants() {
        return restaurantRepository.findAll().stream().map(this::convertRestaurantDaoToDto).collect(Collectors.toList());
    }

    @Override
    public Optional<RestaurantDto> addRestaurant(String name, Integer deliveryPrice, List<String> categories) {
        if(restaurantRepository.findByName(name).isPresent())
            return Optional.empty();

        List<RestaurantCategory> restaurantCategoryList = categories.stream().map(this::convertNameToRestaurantCategory).toList();

        Restaurant restaurant = new Restaurant(null, name, deliveryPrice, restaurantCategoryList, List.of());

        restaurantRepository.save(restaurant);

        return Optional.of(convertRestaurantDaoToDto(restaurant));
    }

    private RestaurantDto convertRestaurantDaoToDto(Restaurant restaurant) {
        return new RestaurantDto(
                restaurant.getName(),
                restaurant.getDeliveryPrice(),
                restaurant.getCategory().stream().map(this::convertRestaurantCategoryToDto).collect(Collectors.toList()),
                restaurant.getProducts().stream().map(this::convertProductToDto).collect(Collectors.toList())
        );
    }

    private ProductDto convertProductToDto(Product product) {
        return new ProductDto(
                product.getName(),
                product.getCategory().getName(),
                product.getPrice()
        );
    }

    private RestaurantCategoryDto convertRestaurantCategoryToDto(RestaurantCategory restaurantCategory) {
        return new RestaurantCategoryDto(restaurantCategory.getName());
    }

    private RestaurantCategory convertNameToRestaurantCategory(String name) {
        return restaurantCategoryRepository.findByName(name).orElseGet(() -> new RestaurantCategory(null, name));
    }
}
