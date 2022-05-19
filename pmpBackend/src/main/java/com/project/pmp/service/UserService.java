package com.project.pmp.service;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.User;

import java.util.List;

public interface UserService {
    UserDto save(UserDto p);

    void delete(String id);

    UserDto getById(String id);
    UserDto getByEmail(String email);

    List<UserDto> getAll();
    List<UserDto> findTop10MostTenant();

    List<UserDto> getLastTenLoggedIn();

    UserDto update(String id, UserDto userDTO);

//    List<UserDto> findLast10Logged();
}
