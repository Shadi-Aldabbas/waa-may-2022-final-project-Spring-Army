package com.project.pmp.dto;

import com.project.pmp.entity.Address;
import lombok.Data;

@Data
public class IncomeDto {

    private Address address;
    private double income;
}
