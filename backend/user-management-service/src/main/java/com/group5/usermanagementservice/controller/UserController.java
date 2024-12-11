package com.group5.usermanagementservice.controller;

import com.group5.usermanagementservice.dto.TextResponse;
import com.group5.usermanagementservice.dto.UserDto;
import com.group5.usermanagementservice.service.UserService;
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
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/test")
    public TextResponse test() {
        return new TextResponse("Hello World");
    }

    @PostMapping("/save")
    public UserDto addUser(@RequestPart("file") MultipartFile file, @RequestPart("user") UserDto userDTO) throws Exception {
        try {
            return userService.saveUser(file, userDTO);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("invalid access");
        } catch (Exception e) {
            throw new Exception("invalid access");
        }
    }

    @PutMapping("/update/{id}")
    public UserDto updateUser(@PathVariable Long id, @RequestPart("file") MultipartFile file, @RequestPart("user") UserDto userDTO) {
        return userService.updateUser(id, file, userDTO);

    }

    @DeleteMapping("/delete/{id}")
    public TextResponse deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return new TextResponse("User deleted successfully");
    }

    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping("/all-users")
    public List<UserDto> getAllUsers() {
        return userService.allUsers();
    }


}
