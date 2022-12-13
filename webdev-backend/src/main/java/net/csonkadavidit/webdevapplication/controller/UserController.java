package net.csonkadavidit.webdevapplication.controller;

import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.user.data.UserDto;
import net.csonkadavidit.webdevapplication.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam Map<String, String> userParams) {
        Optional<UserDto> user = userService
                .register(userParams.get("email"), userParams.get("name"), userParams.get("password"));

        System.out.println("Registered user");

        if(user.isPresent())
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered");
        else
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {
        Optional<UserDto> user = userService.login(email, password);

        System.out.println("Log in");

        if(user.isPresent())
            return ResponseEntity.status(HttpStatus.OK).body("User logged in");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        Optional<UserDto> user = userService.logout();

        System.out.println("Log out");

        if(user.isPresent())
            return ResponseEntity.status(HttpStatus.OK).body("User logged out");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
