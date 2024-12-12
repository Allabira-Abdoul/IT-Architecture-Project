package com.group5.usermanagementservice.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {
    void validateToken(final String token);

    String generateToken(String username);

    String extractEmail(String token);
}
