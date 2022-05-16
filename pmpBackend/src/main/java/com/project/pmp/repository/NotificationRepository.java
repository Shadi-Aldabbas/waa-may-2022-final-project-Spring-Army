package com.project.pmp.repository;

import com.project.pmp.entity.Notification;
import com.project.pmp.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends CrudRepository<Notification,Integer> {
}
