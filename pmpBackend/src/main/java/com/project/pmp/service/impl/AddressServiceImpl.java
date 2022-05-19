package com.project.pmp.service.impl;

import com.project.pmp.dto.PropertyDto;
import com.project.pmp.entity.Address;
import com.project.pmp.repository.AddressRepository;
import com.project.pmp.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;
    @Override
    public Address getById(int id) {

        return addressRepository.findById(id).get();
    }
}
