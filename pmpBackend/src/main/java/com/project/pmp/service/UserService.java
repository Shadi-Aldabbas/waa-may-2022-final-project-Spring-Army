package com.project.pmp.service;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.User;

import java.util.List;

public interface UserService {
    UserDto save(User p);

    void delete(int id);

    UserDto getById(int id);

    List<UserDto> getAll();

//    List<UserDto> findLast10Logged();
}
