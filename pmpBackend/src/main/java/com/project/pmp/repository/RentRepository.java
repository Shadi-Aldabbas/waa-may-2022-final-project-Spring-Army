package com.project.pmp.repository;

import com.project.pmp.dto.LineChartDataDto;
import com.project.pmp.dto.LineChartDataInterface;
import com.project.pmp.entity.Rent;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentRepository extends CrudRepository<Rent,Integer> {

//    List<Rent>findByIdIsNotNullAndStartDateBefore(Date startDate);

    @Query(value="SELECT count(*) as uv, r.start_date as startDate from rent r WHERE r.start_date >= NOW() - INTERVAL '7 days' GROUP BY r.start_date", nativeQuery=true)
    List<LineChartDataInterface> findByIdIsNotNullAndStartDateBefore();

}
