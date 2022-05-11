package com.project.pmp.service.impl;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.User;
import com.project.pmp.repository.UserRepository;
import com.project.pmp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository userRepo;
    @Override
    public User save(User p) {
       return userRepo.save(p);
    }

    @Override
    public void delete(int id) {
        userRepo.deleteById(id);
    }

    @Override
    public UserDto getById(int id) {
        UserDto result = new UserDto();
        var item = userRepo.findById(id).get();
        result.setEmail(item.getEmail());
        result.setFirstName(item.getFirstName());
        result.setLastname(item.getLastname());
        result.setId(item.getId());
        result.setPassword(item.getPassword());
        return result;
    }

    @Override
    public List<UserDto> getAll() {
        var result= new ArrayList<UserDto>();
        userRepo.findAll().forEach(item -> {
            UserDto p = new UserDto();
            p.setId(item.getId());
            p.setFirstName(item.getFirstName());
            p.setLastname(item.getLastname());
            p.setEmail(item.getEmail());
            p.setPassword(p.getPassword());
            result.add(p);
        });

        return result;
    }
}
