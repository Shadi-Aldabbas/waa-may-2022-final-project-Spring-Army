package com.project.pmp.service;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.User;

import java.util.List;

public interface UserService {
    User save(User p);

    void delete(int id);

    UserDto getById(int id);

    List<UserDto> getAll();
}
