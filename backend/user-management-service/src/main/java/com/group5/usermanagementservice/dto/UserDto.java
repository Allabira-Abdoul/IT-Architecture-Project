package com.group5.usermanagementservice.dto;


import com.group5.usermanagementservice.enumeration.Role;

import java.time.LocalDate;

public record UserDto(
    Long id,

    String fullName,

    String email,

    String password,

    Role role,

    LocalDate createdDate,

    String imageUrl
){}
