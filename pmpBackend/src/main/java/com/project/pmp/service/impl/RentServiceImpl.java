package com.project.pmp.service.impl;

import com.project.pmp.dto.LineChartDataDto;
import com.project.pmp.dto.RentDto;
import com.project.pmp.entity.Rent;
import com.project.pmp.repository.RentRepository;
import com.project.pmp.service.RentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RentServiceImpl implements RentService {

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private  ModelMapper modelMapper;

    @Override
    public RentDto save(Rent p) {
        return modelMapper.map(rentRepository.save(p), RentDto.class);
    }

    @Override
    public Boolean delete(int id) {
        var rent = rentRepository.findById(id);
        if(rent.isPresent()){
            var result = rent.get();
            result.setIsDeleted(true);
            rentRepository.save(result);
            return true;
        }
        return false;

    }

    @Override
    public RentDto getById(int id) {
        return modelMapper.map(rentRepository.findById(id), RentDto.class);
    }

    @Override
    public List<RentDto> getAll() {
        var result= new ArrayList<RentDto>();
        rentRepository.findAll().forEach(item -> {
            RentDto rent = modelMapper.map(item, RentDto.class);
            result.add(rent);
        });

        return result;
    }

    @Override
    public List<LineChartDataDto> findByStartDateAfter() {
        var result= new ArrayList<LineChartDataDto>();
        System.out.println(rentRepository.findByIdIsNotNullAndStartDateBefore());
        rentRepository.findByIdIsNotNullAndStartDateBefore().forEach(item -> {
            var dto = new LineChartDataDto();
            dto.setUv(item.getUv());
            dto.setStartDate(item.getStartDate());
            result.add(dto);
        });

        return result;
    }
}
