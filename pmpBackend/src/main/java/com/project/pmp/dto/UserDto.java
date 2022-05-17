package com.project.pmp.dto;

import com.project.pmp.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
public class UserDto {
    private String id;
    private String email;
    private String phone;
    private  String firstName;
    private  String lastname;
    private String password;
    private Date createdAt;
    private Date setLastLoggedInAt;
    private Role role;
    private boolean isActive;

}