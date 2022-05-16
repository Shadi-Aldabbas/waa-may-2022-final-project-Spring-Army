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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;
    private  String firstName;
    private  String lastname;
    private  String password;

    @OneToOne
    private  Role role;

    private Date lastLoggedInAt;
    private Date createdAt;
    private Date updatedAt;
    private Date deletedAt;
    private boolean isActive;
    private boolean isDeleted;



}
