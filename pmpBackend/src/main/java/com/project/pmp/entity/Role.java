package com.project.pmp.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String Name;

}
