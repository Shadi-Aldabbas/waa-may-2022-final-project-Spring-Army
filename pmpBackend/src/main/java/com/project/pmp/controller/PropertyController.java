package com.project.pmp.controller;

import com.project.pmp.dto.*;
import com.project.pmp.entity.User;
import com.project.pmp.entity.Property;
import com.project.pmp.security.Constants;
import com.project.pmp.security.UserDetails;
import com.project.pmp.service.AddressService;
import com.project.pmp.service.PropertyService;
import com.project.pmp.service.RentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/properties")
@CrossOrigin
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private UserDetails userDetails;
    @Autowired
    private RentService rentService;

    @Autowired
    private  ModelMapper modelMapper;


    @RolesAllowed({Constants.ADMIN,Constants.LANDLOARD})
    @PostMapping
    public GenericResponse save(@RequestBody Property p) {

        var user = userDetails.getUserDetails();

        p.setOwnedBy(modelMapper.map(user,User.class));
        var property = propertyService.save(p);

        if(property.getId() > 0){
            return  new GenericResponse("successfuly added", 200, property);
        }

        return  new GenericResponse("property has failed to add", 500, null);
    }
    @RolesAllowed({Constants.ADMIN,Constants.LANDLOARD})
    @DeleteMapping("/{id}")
    public ResponseEntity<GenericResponse> deleteById(@PathVariable int id) {

        if(propertyService.delete(id)){
           return ResponseEntity.ok(new GenericResponse(" Property deleted", 200,null));
        }

        return ResponseEntity.status(404).body(new GenericResponse(" Property deleted", 200,null));
    }
    @GetMapping
    @RolesAllowed({Constants.ADMIN, Constants.TENANT, Constants.LANDLOARD})
    public ResponseEntity<GenericResponse> getAll() {
        var result = new ArrayList<PropertyDto>();

        var roleID = userDetails.getUserDetails().getRole().getId();
       if(roleID == 1){
           result.addAll(propertyService.getAll());
       } else if (roleID == 3) {
           result.addAll(propertyService.getAll().stream().filter(x->x.getOwnedBy().getRole().getId() == 3).collect(Collectors.toList()));

       }else{
           var rentedProperty = rentService.getAll().stream().filter(x->x.getTenant().getId() == userDetails.getUserDetails().getId()).collect(Collectors.toList());
           var propertyList = propertyService.getAll();

           rentedProperty.forEach(item ->{
               propertyList.forEach(prop ->{
                   if(prop.getId() == item.getProperty().getId()){
                       result.add(prop);
                   }

               });
           });



       }

        return ResponseEntity.ok(new GenericResponse(result.size()+" Property Found", 200, result));

    }

    @GetMapping("/top10")
    @RolesAllowed(Constants.ADMIN)
    public ResponseEntity<GenericResponse> findTop10Rented() {
        var result = propertyService.findTop10Rented();

        return ResponseEntity.ok(new GenericResponse(result.size()+" Property Found", 200,result));
    }

    @GetMapping("/next-month")
    @RolesAllowed(Constants.ADMIN)
    public ResponseEntity<GenericResponse> findPropertyByLeaseEndinginMonth() {
        var result = propertyService.findPropertyByLeaseEndinginMonth();

        return ResponseEntity.ok(new GenericResponse(result.size()+" Property Found", 200,result));
    }

    @GetMapping("/totalincome")
    @RolesAllowed({Constants.ADMIN,Constants.LANDLOARD})
    public ResponseEntity<GenericResponse> findTotalincome() {
        UserDto user = userDetails.getUserDetails();

        List<IncomeDtoInterface> result;
        if(user.getRole().getId() == 1) {
            result = propertyService.findTotalincome();
        } else {
            result = propertyService.findTotalincome(user.getId());
        }

        List<IncomeDto> incomes = new ArrayList<>();

        result.forEach(item -> {
            IncomeDto income = new IncomeDto();
            income.setAddress(addressService.getById(item.getAddress()));
            income.setIncome(item.getIncome());
            incomes.add(income);
        });

        return ResponseEntity.ok(new GenericResponse(incomes.size()+" Property Found", 200,incomes));
    }
    @GetMapping("/{id}")
    @RolesAllowed({Constants.ADMIN, Constants.TENANT, Constants.LANDLOARD})
    public ResponseEntity<GenericResponse> getById(@PathVariable int id) {
        GenericResponse result = new GenericResponse("success", 200, propertyService.getById(id));
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    @RolesAllowed({Constants.ADMIN, Constants.LANDLOARD})
    public GenericResponse update(@PathVariable int id, @RequestBody PropertyDto propertyDto){
        var property = propertyService.update(id, propertyDto);
        if(property.getId()>0){
            return new GenericResponse("success", 200,property );
        }
        else{
            return new GenericResponse("fail baby", 500,null );
        }
    }
}
