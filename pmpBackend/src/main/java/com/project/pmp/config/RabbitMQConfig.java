package com.project.pmp.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Queue;
@Configuration
public class RabbitMQConfig {

    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory("localhost");
        connectionFactory.setUsername("guest");
        connectionFactory.setPassword("guest");
        return connectionFactory;
    }

    @Value("${queue.name}")
    private String message;

    @Bean
    public Queue SpringQue() {
        return new Queue("SpringArmy", true);
    }



    @Bean
    DirectExchange exchange() {
        return new DirectExchange("direct-exchange");
    }


    @Bean
    Binding SpringBinding(Queue springQueue, DirectExchange exchange){
        return BindingBuilder.bind(springQueue).to(exchange).with("routing-key-spring");
    }

}
