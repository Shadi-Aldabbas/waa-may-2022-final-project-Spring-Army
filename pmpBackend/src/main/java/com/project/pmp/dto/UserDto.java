package com.project.pmp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    private int id;
    private String email;
    private  String firstName;
    private  String lastname;
    private String password;
    private String phone;

}