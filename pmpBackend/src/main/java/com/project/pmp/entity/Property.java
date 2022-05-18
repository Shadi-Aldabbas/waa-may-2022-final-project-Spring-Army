package com.project.pmp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.pmp.dto.PropertyType;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    private int numberOfBedrooms;
    private int numberOfBathrooms;
    private double rentAmount;
    private double securityDepositAmount;

    @ManyToOne
    @JoinColumn(name = "owned_user_id")
    private User ownedBy;
    private boolean isRented;
    private boolean isDeleted;
    private boolean isActive;

    @ElementCollection // 1
    @CollectionTable(name = "photos", joinColumns = @JoinColumn(name = "photoId")) // 2
    @Column(name = "photo") // 3
    private List<String> photos;

//    @OneToOne
//    @JoinColumn(name = "last_rented_by")
//    private User lastRentedBy ;




    @Enumerated(EnumType.STRING)
    @Column(name = "property_type")
    private PropertyType propertyType;
}
