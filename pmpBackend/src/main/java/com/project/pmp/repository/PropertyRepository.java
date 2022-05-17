package com.project.pmp.repository;

import com.project.pmp.dto.IncomeDtoInterface;
import com.project.pmp.entity.Property;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends CrudRepository<Property,Integer> {


    @Query(value="select  p.* from property p, rent r where p.id = r.property_id order by r.start_date  desc LIMIT 10", nativeQuery=true)
     List<Property> findTop10Rented();

    @Query(value="select p.address_id as address, sum(r.price) as income  from rent r , property p where r.property_id = p.id group by p.address_id", nativeQuery=true)
    List<IncomeDtoInterface> findTotalincome();

    @Query(value="select p.address_id as address, sum(r.price) as income  from rent r , property p where (r.property_id = p.id and r.owner_Id = "+":id"+") group by p.address_id", nativeQuery=true)
    List<IncomeDtoInterface> findTotalincome(String id);


    @Query(value="select  p.* from property p, rent r where (p.id = r.property_id )and r.end_date between now()  and (now()  + interval '1 month')", nativeQuery=true)
    List<Property> findPropertyByLeaseEndinginMonth();



}