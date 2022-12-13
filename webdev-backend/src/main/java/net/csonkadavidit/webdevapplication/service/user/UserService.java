package net.csonkadavidit.webdevapplication.service.user;


import net.csonkadavidit.webdevapplication.persistence.user.data.UserDto;

import java.util.Optional;

public interface UserService {
    Optional<UserDto> register(String email, String username, String password);
    Optional<UserDto> login(String email, String password);
    Optional<UserDto> logout();
}
