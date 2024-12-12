package com.group5.emailnotificationservice.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final String GATEWAY_IP = "127.0.0.1";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers(new GatewayIpRequestMatcher())
                .permitAll()   // Allow requests from Gateway IP
                .anyRequest().denyAll() // Deny all other requests
                .and()
                .build();
    }

    // Custom RequestMatcher to allow only requests from the specified IP
    private static class GatewayIpRequestMatcher implements RequestMatcher {
        @Override
        public boolean matches(HttpServletRequest request) {
            String clientIp = request.getRemoteAddr();
            return GATEWAY_IP.equals(clientIp);  // Check if the client IP matches Gateway IP
        }
    }
}

