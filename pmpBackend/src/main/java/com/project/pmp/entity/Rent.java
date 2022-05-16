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

    @OneToOne
    private User owner;

    @OneToOne
    private User tenant;

    private double price;
    private Date startDate;
    private Date endDate;
    private Boolean isDeleted;

    @OneToOne
    private Property property;






}
