package net.csonkadavidit.webdevapplication.persistence.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.restaurant.repo.RestaurantRepository;
import net.csonkadavidit.webdevapplication.persistence.user.data.Role;
import net.csonkadavidit.webdevapplication.persistence.user.data.User;
import net.csonkadavidit.webdevapplication.persistence.user.repo.UserRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile("!persistent")
@RequiredArgsConstructor
public class InMemoryInitializer {
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

    @PostConstruct
    public void init() {
        Role adminRole = new Role(null, "Admin", false, true, true);

        User admin = new User(null, "admin@admin.com", "admin", "admin", List.of(adminRole));

        userRepository.save(admin);
    }
}
