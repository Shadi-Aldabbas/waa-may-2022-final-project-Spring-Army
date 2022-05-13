package com.project.pmp.service;



import com.project.pmp.dto.PropertyDto;
import com.project.pmp.entity.Property;

import java.util.List;

public interface PropertyService {
    PropertyDto save(Property p);

    void delete(int id);

    PropertyDto getById(int id);

    List<PropertyDto> getAll();
}
