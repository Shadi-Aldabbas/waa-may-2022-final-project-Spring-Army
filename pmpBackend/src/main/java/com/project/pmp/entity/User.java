package com.project.pmp.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "Users")
public class User {
     @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String email;
    private String phone;
    private  String firstName;
    private  String lastname;
    private  String password;

    @OneToOne(cascade = CascadeType.ALL)
    private  Role role;

    private Date lastLoggedInAt;
    private Date createdAt;
    private Date updatedAt;
    private Date deletedAt;
    private boolean isActive;
    private boolean isDeleted;



}
