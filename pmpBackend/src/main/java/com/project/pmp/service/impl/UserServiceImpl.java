package com.project.pmp.service.impl;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.Property;
import com.project.pmp.entity.User;
import com.project.pmp.repository.UserRepository;
import com.project.pmp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
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
    public UserDto save(UserDto p) {
        p.setCreatedAt(new Date());
        p.setActive(true);
       return modelMapper.map(userRepo.save(modelMapper.map(p, User.class)), UserDto.class);
    }

    @Override
    public void delete(String id) {
        userRepo.deleteById(id);
    }

    @Override
    public UserDto getById(String id) {
        UserDto user = modelMapper.map(userRepo.findById(id), UserDto.class);
        return user;
    }

    @Override
    public UserDto getByEmail(String email) {
        UserDto user = modelMapper.map(userRepo.findByEmail(email), UserDto.class);
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

    @Override
    public List<UserDto> findTop10MostTenant() {
        var result= new ArrayList<UserDto>();
        userRepo.findTop10MostTenant().forEach(item -> {
            UserDto user = modelMapper.map(item, UserDto.class);
            result.add(user);
        });

        return result;
    }

    @Override
    public List<UserDto> getLastTenLoggedIn() {
        var result= new ArrayList<UserDto>();
        userRepo.findTop10ByIdIsNotNullOrderByLastLoggedInAtDesc().forEach(item -> {
            UserDto user = modelMapper.map(item, UserDto.class);
            result.add(user);
            System.out.println(item);
        });
        return result;
    }

    @Override
    public UserDto update(String id, UserDto userDTO) {
        var p = userRepo.findById(id).get();
        if(p != null){
            var user = modelMapper.map(userDTO, User.class);
            userRepo.save(user);
            return userDTO;
        }
        return new UserDto();
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
