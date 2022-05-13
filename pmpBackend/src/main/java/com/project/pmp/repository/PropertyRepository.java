package com.project.pmp.repository;

import com.project.pmp.entity.Property;
import com.project.pmp.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends CrudRepository<Property,Integer> {

}