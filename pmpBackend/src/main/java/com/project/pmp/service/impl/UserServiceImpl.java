package com.project.pmp.service.impl;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.User;
import com.project.pmp.repository.UserRepository;
import com.project.pmp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
    @Autowired
    private final ModelMapper modelMapper;
    @Override
    public UserDto save(User p) {
       return modelMapper.map(userRepo.save(p), UserDto.class);
    }

    @Override
    public void delete(int id) {
        userRepo.deleteById(id);
    }

    @Override
    public UserDto getById(int id) {
        UserDto user = modelMapper.map(userRepo.findById(id).get(), UserDto.class);
        System.out.printf(user.toString());
        return user;
    }

    @Override
    public List<UserDto> getAll() {
        var result= new ArrayList<UserDto>();
        userRepo.findAll().forEach(item -> {
            UserDto user = modelMapper.map(item, UserDto.class);
            result.add(user);
        });

        return result;
    }

//    @Override
//    public List<UserDto> findLast10Logged() {
//        var result= new ArrayList<UserDto>();
//        userRepo.findTop10ByLastLoggedInAtDesc().forEach(item->{
//            UserDto user = modelMapper.map(item, UserDto.class);
//            result.add(user);
//        });
//        return result;
//    }
}
