package net.csonkadavidit.webdevapplication.persistence.user.data;

import lombok.Value;

@Value
public class UserDto {
    String username;
    Boolean canOrder;
    Boolean canCreate;
    Boolean canModify;
}
