package net.csonkadavidit.webdevapplication.persistence.restaurant.data;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String name;

    @Column(name = "delivery_price")
    private Integer deliveryPrice;

    @ManyToMany(cascade = CascadeType.MERGE)
    private List<RestaurantCategory> category;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Product> products;
}
