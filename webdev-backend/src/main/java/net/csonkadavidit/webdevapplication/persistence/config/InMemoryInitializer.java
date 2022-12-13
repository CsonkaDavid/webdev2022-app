package net.csonkadavidit.webdevapplication.persistence.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.user.data.User;
import net.csonkadavidit.webdevapplication.persistence.user.repo.UserRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("!persistent")
@RequiredArgsConstructor
public class InMemoryInitializer {
    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        User admin = new User(null, "admin@admin.com", "admin", "admin", "admin", User.Role.ADMIN);

        userRepository.save(admin);
    }
}
