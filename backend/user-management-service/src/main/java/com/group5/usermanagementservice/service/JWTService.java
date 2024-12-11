package com.group5.usermanagementservice.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {
    public void validateToken(final String token);

    public String generateToken(String username);

    String extractEmail(String token);
}
