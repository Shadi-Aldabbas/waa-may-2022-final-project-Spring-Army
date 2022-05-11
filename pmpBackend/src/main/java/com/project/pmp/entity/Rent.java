package com.project.pmp.entity;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany
    @JoinColumn(name = "ownerId")
    private List<User> ownerId;

    @OneToMany
    @JoinColumn(name = "ownerId")
    private List<User> tenantId;

    private double price;
    private Date startDate;
    private Date endDate;

    @OneToMany
    @JoinColumn(name = "propertyId")
    private List<Property> propertyId ;






}
