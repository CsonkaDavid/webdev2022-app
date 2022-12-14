package net.csonkadavidit.webdevapplication.service.user;

import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.user.data.Address;
import net.csonkadavidit.webdevapplication.persistence.user.data.User;
import net.csonkadavidit.webdevapplication.persistence.user.data.UserDto;
import net.csonkadavidit.webdevapplication.persistence.user.repo.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private UserDto currentUser;

    @Override
    public Optional<UserDto> register(String email, String name, String password) {
        if(userRepository.findByEmail(email).isPresent())
            return Optional.empty();

        String firstName = name.split(" ")[0];
        String lastName = name.replaceFirst(firstName, "");

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        User newUser = new User(
                null,
                email,
                firstName,
                lastName,
                bCryptPasswordEncoder.encode(password),
                new Address(),
                User.Role.USER);

        userRepository.save(newUser);
        login(email, password);

        return Optional.of(currentUser);
    }

    @Override
    public Optional<UserDto> login(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if(existingUser.isEmpty())
            return Optional.empty();

        User user = existingUser.get();

        currentUser = new UserDto(
                user.getEmail(),
                user.getFirstName() + " " + user.getLastName(),
                user.getRole()
        );

        return Optional.of(currentUser);
    }

    @Override
    public Optional<UserDto> logout() {
        if(currentUser == null)
            return Optional.empty();

        UserDto currentUserCopy = currentUser;

        currentUser = null;

        return Optional.of(currentUserCopy);
    }

    @Override
    public Optional<UserDto> describe() {
        if(currentUser == null)
            return Optional.empty();

        return Optional.of(currentUser);
    }

}
