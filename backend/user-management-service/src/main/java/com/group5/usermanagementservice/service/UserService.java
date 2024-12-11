package com.group5.usermanagementservice.service;

import com.group5.usermanagementservice.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    UserDto saveUser(MultipartFile file, UserDto dto);

    UserDto updateUser(Long id, MultipartFile file, UserDto dto);

    List<UserDto> allUsers();

    void delete(Long id);

    UserDto findById(Long id);

    UserDto findByEmail(String email);

}
