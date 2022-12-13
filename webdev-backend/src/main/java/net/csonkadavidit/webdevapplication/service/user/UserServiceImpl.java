package net.csonkadavidit.webdevapplication.service.user;

import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.user.data.User;
import net.csonkadavidit.webdevapplication.persistence.user.data.UserDto;
import net.csonkadavidit.webdevapplication.persistence.user.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private UserDto currentUser;

    @Override
    public Optional<UserDto> register(String email, String name, String password) {
        if(userRepository.countByEmail(email) > 0)
            return Optional.empty();

        String firstName = name.split(" ")[0];
        String lastName = name.replaceFirst(firstName, "");

        User newUser = new User(null, email, firstName, lastName, password, User.Role.USER);

        userRepository.save(newUser);
        login(email, password);

        return Optional.of(currentUser);
    }

    @Override
    public Optional<UserDto> login(String email, String password) {
        if(userRepository.countByEmail(email) == 0)
            return Optional.empty();

        User existingUser = userRepository.findByEmail(email);

        currentUser = new UserDto(
                existingUser.getEmail(),
                existingUser.getFirstName() + " " + existingUser.getLastName(),
                existingUser.getRole()
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

}
