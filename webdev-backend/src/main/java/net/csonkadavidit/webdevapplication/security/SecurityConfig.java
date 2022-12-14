package net.csonkadavidit.webdevapplication.security;

import lombok.RequiredArgsConstructor;
import net.csonkadavidit.webdevapplication.persistence.user.data.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().authenticationProvider(authenticationProvider())
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/main").permitAll()
                .requestMatchers("/user/register").permitAll()
                .requestMatchers("/user/login").hasAnyAuthority(
                        User.Role.USER.name(),
                        User.Role.ADMIN.name(),
                        User.Role.RESTAURANT.name())
                .requestMatchers("/user/logout").hasAnyAuthority(
                        User.Role.USER.name(),
                        User.Role.ADMIN.name(),
                        User.Role.RESTAURANT.name())
                .requestMatchers("/user/current").permitAll()
                .requestMatchers("/list").permitAll()
                .requestMatchers("/account").hasAnyAuthority(
                        User.Role.USER.name(),
                        User.Role.ADMIN.name(),
                        User.Role.RESTAURANT.name())
                .anyRequest().authenticated()
                .and()
                .httpBasic();

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder());

        return provider;
    }
}
