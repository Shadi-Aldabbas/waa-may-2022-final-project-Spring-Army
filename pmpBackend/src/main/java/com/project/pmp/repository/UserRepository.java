package com.project.pmp.repository;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {
}