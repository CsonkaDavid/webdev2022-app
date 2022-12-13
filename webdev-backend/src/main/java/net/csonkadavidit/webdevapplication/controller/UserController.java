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
    public ResponseEntity<HttpStatus> registerUser(@RequestParam Map<String, String> userParams) {
        Optional<UserDto> user = userService
                .register(userParams.get("email"), userParams.get("name"), userParams.get("password"));

        if(user.isPresent())
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        else
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
    }

    @GetMapping("/login")
    public ResponseEntity<HttpStatus> loginUser(@RequestParam String email, @RequestParam String password) {
        Optional<UserDto> user = userService.login(email, password);

        if(user.isPresent())
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
