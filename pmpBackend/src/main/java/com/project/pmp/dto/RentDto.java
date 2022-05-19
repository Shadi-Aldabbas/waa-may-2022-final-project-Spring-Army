package com.project.pmp.dto;

import com.project.pmp.entity.Property;
import com.project.pmp.entity.User;
import lombok.Data;

import java.util.Date;

@Data
public class RentDto {

    private User owner;
    private User tenant;

    private double price;
    private Date startDate;
    private Date endDate;
    private Property property;
}
