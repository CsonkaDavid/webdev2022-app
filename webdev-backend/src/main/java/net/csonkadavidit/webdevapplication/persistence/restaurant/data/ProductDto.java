package net.csonkadavidit.webdevapplication.persistence.restaurant.data;

import lombok.Value;

@Value
public class ProductDto {
    String name;
    String category;
    Integer price;
}
