package com.group5.usermanagementservice.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/auth/test")
    public TextResponse testAuth(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        return new TextResponse("Client IP Address: " + clientIp);
    }

    @PostMapping("/auth/login")
    public TextResponse getToken(@RequestBody LoginDTO authRequest) {
        User user = userService.findByEmail(authRequest.getEmail());
        if(user.getRole() == UserRole.DELETED) {
            throw new RuntimeException("User Deleted");
        }
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            return new TextResponse(userService.generateToken(authRequest.getEmail()));
        } else {
            throw new RuntimeException("invalid access");
        }
    }

    @GetMapping("/auth")
    public User getUserFromToken(@RequestParam("token") String token) {

        return userService.getUserFromToken(token);

    }

    @GetMapping("/auth/validate")
    public TextResponse validateToken(@RequestParam("token") String token) {
        userService.validateToken(token);
        return new TextResponse("Token is valid");
    }


    @PostMapping("/auth/save")
    public ResponseEntity<?> saveUser(@RequestPart("file") MultipartFile file, @RequestPart("user") UserDTO userDTO) {
        try {
            UserDTO savedUser = userService.saveUser(file, userDTO);
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while saving the user.");
        }
    }




    @GetMapping("/user/test")
    public TextResponse test() {
        return new TextResponse("Hello World");
    }


    @PutMapping("/user/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestPart("file") MultipartFile file, @RequestPart("user") UserDTO userDTO) {
        return userService.updateUser(id, file, userDTO);

    }

    //@DeleteMapping("/user/delete/{id}")
    @PutMapping("/user/delete/{id}")
    public TextResponse deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return new TextResponse("User deleted successfully");
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping("/user/all-users")
    public List<User> getAllUsers() {
        return userService.allUsers();
    }

    @PostMapping("/user/save")
    public ResponseEntity<?> addUser(@RequestPart("file") MultipartFile file, @RequestPart("user") UserDTO userDTO) {
        try {
            UserDTO savedUser = userService.saveUser(file, userDTO);
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while saving the user.");
        }
    }

}
