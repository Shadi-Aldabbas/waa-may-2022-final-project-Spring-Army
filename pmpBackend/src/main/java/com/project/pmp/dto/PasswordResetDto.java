package com.project.pmp.dto;

import com.project.pmp.entity.User;
import lombok.Data;

@Data
public class PasswordResetDto {
    private int id;
    private String token;
    private User user;


}
