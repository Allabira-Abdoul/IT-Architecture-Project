package com.group5.usermanagementservice.service.implementation;

import com.group5.usermanagementservice.dto.TextResponse;
import com.group5.usermanagementservice.dto.UserDto;
import com.group5.usermanagementservice.model.User;
import com.group5.usermanagementservice.repository.UserRepository;
import com.group5.usermanagementservice.service.AuthService;
import com.group5.usermanagementservice.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
   @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    @Override
    public TextResponse generateToken(String email) {
        return new TextResponse(jwtService.generateToken(email));
    }

    @Override
    public void validateToken(String token) {
        jwtService.validateToken(token);
    }

    @Override
    public UserDto getUserFromToken(String token) {
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email);

        return new UserDto(user.getId(), user.getFullName(), user.getEmail(), user.getPassword(), user.getRole(), user.getCreatedDate(), user.getImageUrl());
    }
}
