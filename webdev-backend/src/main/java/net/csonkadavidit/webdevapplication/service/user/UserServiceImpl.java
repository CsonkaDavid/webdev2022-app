package net.csonkadavidit.webdevapplication.service.user;

import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.user.data.Address;
import net.csonkadavidit.webdevapplication.persistence.user.data.User;
import net.csonkadavidit.webdevapplication.persistence.user.data.UserDto;
import net.csonkadavidit.webdevapplication.persistence.user.repo.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public Optional<UserDto> register(String email, String firstName, String lastName, String password) {
        if(userRepository.findByEmail(email).isPresent()
                || email.isEmpty()
                || firstName.isEmpty()
                || lastName.isEmpty()
                || password.isEmpty())
            return Optional.empty();

        User newUser = new User(
                null,
                email,
                firstName,
                lastName,
                bCryptPasswordEncoder.encode(password),
                new Address(),
                User.Role.USER,
                true);

        userRepository.save(newUser);

        return Optional.of(convertUserToDto(newUser));
    }

    @Override
    public Optional<UserDto> login(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if(existingUser.isEmpty())
            return Optional.empty();

        String userPassword = existingUser.get().getPassword();

        if(!bCryptPasswordEncoder.matches(userPassword, bCryptPasswordEncoder.encode(userPassword)))
            return Optional.empty();

        User user = existingUser.get();

        user.setLoggedIn(true);

        userRepository.save(user);

        return Optional.of(convertUserToDto(user));
    }

    @Override
    public void logout(String email) {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        existingUser.setLoggedIn(false);

        userRepository.save(existingUser);
    }

    @Override
    public Optional<UserDto> describe(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isEmpty())
            return Optional.empty();

        return Optional.of(convertUserToDto(user.get()));
    }

    private UserDto convertUserToDto(User user) {
        return new UserDto(
                user.getEmail(),
                user.getFirstName() + " " + user.getLastName(),
                user.getRole()
        );
    }
}
