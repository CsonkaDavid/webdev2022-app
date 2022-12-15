package net.csonkadavidit.webdevapplication.persistence.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.user.data.Address;
import net.csonkadavidit.webdevapplication.persistence.user.data.User;
import net.csonkadavidit.webdevapplication.persistence.user.repo.UserRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile("!persistent")
@RequiredArgsConstructor
public class InMemoryInitializer {
    private final UserRepository userRepository;

    @PostConstruct
    public void init() {

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        User admin = new User(
                null,
                "admin@admin.com",
                "admin",
                "admin",
                bCryptPasswordEncoder.encode("admin"),
                new Address(),
                User.Role.ADMIN,
                false);

        userRepository.save(admin);
    }
}
