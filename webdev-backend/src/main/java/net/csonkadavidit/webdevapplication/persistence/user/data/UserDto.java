package net.csonkadavidit.webdevapplication.persistence.user.data;

import lombok.Value;

@Value
public class UserDto {
    String email;
    String name;
    User.Role role;
}
