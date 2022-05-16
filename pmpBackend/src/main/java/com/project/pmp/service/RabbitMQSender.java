package com.project.pmp.service;

import com.project.pmp.entity.Notification;
import com.project.pmp.entity.User;
import com.project.pmp.repository.NotificationRepository;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQSender {
    @Autowired
    private AmqpTemplate amqpTemplate;
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private Queue queue;


    @Value("${javainuse.rabbitmq.exchange}")
    private String exchange;

    @Value("${javainuse.rabbitmq.routingkey}")
    private String routingkey;
    String kafkaTopic = "java_in_use_topic";

    public void send(Notification n) {
        n.setRead(false);
        User u = new User();
        u.setId(28);
        u.setFirstName("Hasim");
        n.setUser(u);
        notificationRepository.save(n);
        rabbitTemplate.convertAndSend(this.queue.getName(), n.getMessage());
    }

    @RabbitListener(queues = {"${queue.name}"})
    public void receive(@Payload String fileBody) {
        System.out.println("Message " + fileBody);
    }

    public void send1(User user) {
        MessageProperties messageProperties = new MessageProperties();
        messageProperties.setHeader("ultima", "sim");
        String mensagem = "test message";
        Message message = new Message(mensagem.getBytes(), messageProperties);
        amqpTemplate.convertAndSend("teste-exchange", "routing-key-teste",  "test ");
        System.out.println("Send msg = " + user);

    }
}
