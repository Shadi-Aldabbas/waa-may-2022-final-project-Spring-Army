package com.project.pmp.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.pmp.dto.GenericResponse;
import com.project.pmp.entity.Notification;
import com.project.pmp.entity.User;
import com.project.pmp.service.RabbitMQSender;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/notification")
@CrossOrigin
public class NotificationController {

    @Autowired
    RabbitMQSender rabbitMQSender;

    @Autowired
    private RabbitTemplate queueSender;

    @GetMapping( "/producer")
    public String producer(@RequestParam("userName") String userName, @RequestParam("userId") String userId) {

        User usr=new User();
        usr.setId(userId);
        usr.setFirstName(userName);
       // rabbitMQSender.send(usr);
       // rabbitMQSender.send();

        return "Message sent to the RabbitMQ JavaInUse Successfully";
    }



    @PostMapping
    public ResponseEntity<GenericResponse> send(@RequestBody Notification n){
        rabbitMQSender.send(n);
        return ResponseEntity.ok(new GenericResponse("Message has been sended successfully", 200, n));
    }

    @GetMapping
    public String send() throws JsonProcessingException {
        queueSender.convertAndSend("SpringExchange", "routing-key-spring", "test message");
        return "ok. done";
    }

//    private final RabbitTemplate queueSender;
//    public NotificationController(RabbitTemplate queueSender) {
//        this.queueSender = queueSender;
//    }
//
//    @GetMapping
//    public String send() throws JsonProcessingException {
//        queueSender.convertAndSend("teste-exchange", "routing-key-teste", "test message");
//        return "ok. done";
//    }

}
