package com.group5.usermanagementservice.service;


import com.group5.usermanagementservice.dto.TextResponse;
import com.group5.usermanagementservice.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuthService {
    TextResponse generateToken(String email);

    void validateToken(String token);

    UserDto getUserFromToken(String token);

}
