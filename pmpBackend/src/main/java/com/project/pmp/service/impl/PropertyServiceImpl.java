package com.project.pmp.service.impl;

import com.project.pmp.dto.IncomeDtoInterface;
import com.project.pmp.dto.PropertyDto;
import com.project.pmp.entity.Property;
import com.project.pmp.repository.PropertyRepository;
import com.project.pmp.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PropertyServiceImpl implements PropertyService {
    @Autowired
    private final PropertyRepository propertyRepository;
    @Autowired
    private final ModelMapper modelMapper;

    @Override
    public PropertyDto save(Property p) {
        return modelMapper.map(propertyRepository.save(p), PropertyDto.class);
    }

    @Override
    public void delete(int id) {
        propertyRepository.deleteById(id);
    }

    @Override
    public PropertyDto getById(int id) {
        PropertyDto result = modelMapper.map(propertyRepository.findById(id).get(), PropertyDto.class);
        return result;
    }

    @Override
    public List<PropertyDto> getAll() {
        var result= new ArrayList<PropertyDto>();
        propertyRepository.findAll().forEach(item -> {
            PropertyDto property = modelMapper.map(item, PropertyDto.class);
            result.add(property);
        });

        return result;
    }

    @Override
    public List<PropertyDto> findTop10Rented() {
        var result= new ArrayList<PropertyDto>();
        System.out.printf( propertyRepository.findTop10Rented().toString());
        propertyRepository.findTop10Rented().forEach(item -> {
            PropertyDto property = modelMapper.map(item, PropertyDto.class);
            result.add(property);
        });
        return result;
    }
    @Override
    public List<PropertyDto> findPropertyByLeaseEndinginMonth() {
        var result= new ArrayList<PropertyDto>();
        propertyRepository.findPropertyByLeaseEndinginMonth().forEach(item -> {
            PropertyDto property = modelMapper.map(item, PropertyDto.class);
            result.add(property);
        });
        return result;
    }

    @Override
    public PropertyDto update(int id, PropertyDto propertyDto) {
        var p = propertyRepository.findById(id);
        if (p.isPresent()){
            var property = modelMapper.map(p, Property.class);
            propertyRepository.save(property);
            return propertyDto;
        }
        return new PropertyDto();
    }

    public List<IncomeDtoInterface> findTotalincome() {
        var result= new ArrayList<IncomeDtoInterface>();
        propertyRepository.findTotalincome().forEach(item -> {
            IncomeDtoInterface income = modelMapper.map(item, IncomeDtoInterface.class);
            result.add(income);
        });
        return result;
    }
}
