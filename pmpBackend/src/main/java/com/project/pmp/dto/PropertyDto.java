package com.project.pmp.dto;

import com.project.pmp.entity.Address;
import com.project.pmp.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class PropertyDto {
    private Address address;
    private int numberOfBedrooms;
    private int numberOfBathrooms;
    private double rentAmount;
    private double securityDepositAmount;
    private User ownedBy;
    private boolean isRented;
    private boolean isDeleted;
    private boolean isActive;
    private PropertyType propertyType;
}
