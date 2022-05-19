package com.project.pmp.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    public enum Currency{
        USD;
    }
    private String description;
    private int amount;
    private Currency currency;
    private String stripeEmail;
    private Token token;
}
