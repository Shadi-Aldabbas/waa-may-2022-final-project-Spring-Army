package com.project.pmp.repository;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.Property;
import com.project.pmp.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User,String> {

    List<User> findTop10ByIdIsNotNullOrderByLastLoggedInAtDesc();
    User findByEmail(String email);
    @Query(value="select  u.* from users u, rent r where u.id = r.tenant_id and  u.role_id =2 order by r.start_date  desc LIMIT 10", nativeQuery=true)
    List<User> findTop10MostTenant();


}