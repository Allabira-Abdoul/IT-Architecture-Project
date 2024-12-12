package com.group5.usermanagementservice.service.implementation;

import com.group5.usermanagementservice.controller.ImageController;
import com.group5.usermanagementservice.dto.UserDto;
import com.group5.usermanagementservice.model.User;
import com.group5.usermanagementservice.repository.UserRepository;
import com.group5.usermanagementservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageController imageController;

    @Override
    public UserDto saveUser(MultipartFile file, UserDto dto) {
        User existingUserByEmail = userRepository.findByEmail(dto.email());

        if (existingUserByEmail != null) {
            throw new IllegalArgumentException("A user with this email already exists.");
        }

        if (userRepository.findByFullName(dto.fullName()).isPresent()) {
            throw new IllegalArgumentException("A user with this name already exists.");
        }
        
        User user = new User();
        user.setFullName(dto.fullName());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setCreatedDate(LocalDate.now());
        user.setRole(dto.role());
        user.setEmail(dto.email());
        user.setImageUrl(imageController.handleFileUpload(file));
        userRepository.save(user);
        return dto;
    }

    @Override
    public UserDto updateUser(Long id, MultipartFile file, UserDto dto) {
        System.out.println("Okay----------------");
        User user = userRepository.findById(id).orElse(null);
        if (user != null){
            user.setFullName(dto.fullName());
            user.setPassword(passwordEncoder.encode(dto.password()));
            user.setEmail(dto.email());
            if(file!=null){
                user.setImageUrl(imageController.handleFileUpload(file));
            }
            userRepository.save(user);
            return dto;
        }
        return null;
    }

    @Override
    public UserDto findById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null){
            return new UserDto(user.getId(), user.getFullName(), user.getEmail(), user.getPassword(), user.getRole(), user.getCreatedDate(), user.getImageUrl());
        }
        return null;
    }

    @Override
    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if(user != null){
            return new UserDto(user.getId(), user.getFullName(), user.getEmail(), user.getPassword(), user.getRole(), user.getCreatedDate(), user.getImageUrl());
        }
        return null;
    }

    @Override
    public List<UserDto> allUsers() {
        List<User> users = userRepository.findAll();
        List<UserDto> dtoList = new ArrayList<>();
        for (User user: users) {
            dtoList.add(new UserDto(user.getId(), user.getFullName(), user.getEmail(), user.getPassword(), user.getRole(), user.getCreatedDate(), user.getImageUrl()));
        }
        return dtoList;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }
}
