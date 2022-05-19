package com.project.pmp.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String message;
    private boolean isRead;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
