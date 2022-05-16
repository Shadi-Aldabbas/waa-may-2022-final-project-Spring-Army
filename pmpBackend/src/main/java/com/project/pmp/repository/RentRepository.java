package com.project.pmp.repository;

import com.project.pmp.entity.Property;
import com.project.pmp.entity.Rent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentRepository extends CrudRepository<Rent,Integer> {

}
