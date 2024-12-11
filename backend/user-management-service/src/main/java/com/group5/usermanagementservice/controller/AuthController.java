package com.group5.usermanagementservice.controller;

import com.group5.usermanagementservice.dto.LoginDto;
import com.group5.usermanagementservice.dto.UserDto;
import com.group5.usermanagementservice.dto.TextResponse;
import com.group5.usermanagementservice.model.User;
import com.group5.usermanagementservice.service.AuthService;
import com.group5.usermanagementservice.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/test")
    public TextResponse testAuth(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        return new TextResponse("Client IP Address: " + clientIp);
    }

    @PostMapping("/login")
    public TextResponse getToken(@RequestBody LoginDto authRequest) {
        UserDto user = userService.findByEmail(authRequest.email());
        if(user == null) {
            throw new RuntimeException("User Doesn't exist");
        }
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.password()));
        if (authenticate.isAuthenticated()) {
            return authService.generateToken(authRequest.email());
        } else {
            throw new RuntimeException("invalid access");
        }
    }

    @GetMapping("")
    public UserDto getUserFromToken(@RequestParam("token") String token) {

        return authService.getUserFromToken(token);

    }

    @GetMapping("/validate")
    public TextResponse validateToken(@RequestParam("token") String token) {
        authService.validateToken(token);
        return new TextResponse("Token is valid");
    }


    @PostMapping("/auth/save")
    public UserDto saveUser(@RequestPart("file") MultipartFile file, @RequestPart("user") UserDto userDTO) throws Exception {
        try {
            return userService.saveUser(file, userDTO);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("invalid access");
        } catch (Exception e) {
            throw new Exception("invalid access");
        }
    }
}
