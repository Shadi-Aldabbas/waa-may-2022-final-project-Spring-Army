package com.project.pmp.service;

import com.project.pmp.dto.LineChartDataDto;
import com.project.pmp.dto.RentDto;
import com.project.pmp.entity.Rent;

import java.util.List;

public interface RentService {
    RentDto save(Rent p);

    Boolean delete(int id);

    RentDto getById(int id);

    List<RentDto> getAll();

    List<LineChartDataDto> findByStartDateAfter();
}
