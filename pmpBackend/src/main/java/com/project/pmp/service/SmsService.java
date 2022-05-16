package com.project.pmp.service;

import com.project.pmp.dto.GenericResponse;
import com.project.pmp.dto.SmsDto;
import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.Notification;
import com.project.pmp.entity.User;
import com.telesign.MessagingClient;
import com.telesign.RestClient;
import com.telesign.Util;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    private final String apiKey = "YXyaKhi2FRWZam/foGmU7i24lUgVATB39so2GOV7+ZIqnL1tdRyM4tbokd4fQF4blXa3T04mSLbw3F5u7/8nPA==";
    private final String customerId = "0A47B462-8569-4FD0-96D8-E55BB1EACD91";
    public SmsDto send(UserDto u, String message) {

        String phoneNumber = u.getPhone();
        String verifyCode = Util.randomWithNDigits(5);
        String messageType = "ARN";
        SmsDto result = new SmsDto();
        try {
            MessagingClient messagingClient = new MessagingClient(customerId, apiKey);
            RestClient.TelesignResponse telesignResponse = messagingClient.message(phoneNumber, message, messageType, null);

            result.setSent(true);
            result.setMessage("Message has been send successfully");
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }

        result.setSent(false);
        result.setMessage("error");
        return  result;
    }

    public SmsDto sendCode(UserDto u) {

        String phoneNumber = u.getPhone();
        String verifyCode = Util.randomWithNDigits(5);
        String message = String.format("Your code is %s", verifyCode);
        String messageType = "OTP";
        SmsDto result = new SmsDto();
        try {
            MessagingClient messagingClient = new MessagingClient(customerId, apiKey);
            RestClient.TelesignResponse telesignResponse = messagingClient.message(phoneNumber, message, messageType, null);

            result.setSent(true);
            result.setMessage("Message has been send successfully");
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }

        result.setSent(false);
        result.setMessage("error");
        return  result;
    }
}
