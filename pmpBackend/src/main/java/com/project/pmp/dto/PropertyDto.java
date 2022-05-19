package com.project.pmp.dto;

import com.project.pmp.entity.Address;
import com.project.pmp.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class PropertyDto {

    private int id;
    private Address address;
   // @Min(value = 1, message = "Bed room must be greater than or one")
    private int numberOfBedrooms;
    private int numberOfBathrooms;
    @Min(value = 0, message = "Rent must be a number")
    private double rentAmount;
    @Min(value = 0, message = "Security Amount must be a number")
    //@Pattern(regexp="\\d+$", message = "Security Amount must be a number")
    private double securityDepositAmount;
    private List<String> photos;
    private User ownedBy;
    private boolean isRented;
    private boolean isDeleted;
    private boolean isActive;
    private PropertyType propertyType;
}
