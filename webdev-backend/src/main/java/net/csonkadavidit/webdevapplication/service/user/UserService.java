package net.csonkadavidit.webdevapplication.service.user;


import net.csonkadavidit.webdevapplication.persistence.user.data.UserDto;

import java.util.Optional;

public interface UserService {
    Optional<UserDto> register(String email, String firstName, String lastName, String password);
    Optional<UserDto> login(String email, String password);
    void logout(String email);
    Optional<UserDto> describe(String email);
}
