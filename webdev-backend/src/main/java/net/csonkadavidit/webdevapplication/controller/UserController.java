package net.csonkadavidit.webdevapplication.controller;

import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.user.data.UserDto;
import net.csonkadavidit.webdevapplication.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam Map<String, String> userParams) {
        Optional<UserDto> user = userService
                .register(userParams.get("email"), userParams.get("name"), userParams.get("password"));

        System.out.println("Registered user");

        return user.map(userDto -> ResponseEntity.status(HttpStatus.CREATED).body("User registered"))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists"));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {
        Optional<UserDto> user = userService.login(email, password);

        System.out.println("Log in");

        return user.map(userDto -> ResponseEntity.status(HttpStatus.OK).body("User logged in"))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        Optional<UserDto> user = userService.logout();

        System.out.println("Log out");

        return user.map(userDto -> ResponseEntity.status(HttpStatus.OK).body("User logged out"))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/current")
    public ResponseEntity<UserDto> getCurrentUser() {
        Optional<UserDto> user = userService.describe();

        System.out.println("Describe");

        return user.map(userDto -> ResponseEntity.status(HttpStatus.OK).body(userDto))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
}
