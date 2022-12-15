package net.csonkadavidit.webdevapplication.persistence.restaurant.data;

import lombok.Value;

import java.util.List;

@Value
public class RestaurantDto {
    String name;
    Integer deliveryPrice;
    List<RestaurantCategoryDto> category;
    List<ProductDto> products;
}
