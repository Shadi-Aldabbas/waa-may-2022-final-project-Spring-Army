package com.project.pmp.service;

import com.project.pmp.dto.PaymentRequest;
import com.stripe.exception.StripeException;

public interface PaymentService {

    void init();
    String charge(PaymentRequest chargeRequest) throws StripeException;
}
