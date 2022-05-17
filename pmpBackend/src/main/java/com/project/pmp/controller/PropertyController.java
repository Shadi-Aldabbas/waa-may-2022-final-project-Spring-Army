package com.project.pmp.controller;

import com.project.pmp.dto.GenericResponse;
import com.project.pmp.dto.IncomeDto;
import com.project.pmp.dto.IncomeDtoInterface;
import com.project.pmp.dto.PropertyDto;
import com.project.pmp.entity.Property;
import com.project.pmp.service.AddressService;
import com.project.pmp.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/properties")
@CrossOrigin
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private AddressService addressService;

    @PostMapping
    public GenericResponse save(@RequestBody Property p) {



        var property = propertyService.save(p);

        if(property.getId() > 0){
            return  new GenericResponse("successfuly added", 200, property);
        }

        return  new GenericResponse("property has failed to add", 500, null);
    }
    @DeleteMapping
    public void deleteById(@RequestParam int p) {
        propertyService.delete(p);
    }
    @GetMapping
    public ResponseEntity<GenericResponse> getAll() {
        var result = propertyService.getAll();

        return ResponseEntity.ok(new GenericResponse(result.size()+" Property Found", 200,result));
    }

    @GetMapping("/top10")
    public ResponseEntity<GenericResponse> findTop10Rented() {
        var result = propertyService.findTop10Rented();

        return ResponseEntity.ok(new GenericResponse(result.size()+" Property Found", 200,result));
    }

    @GetMapping("/next-month")
    public ResponseEntity<GenericResponse> findPropertyByLeaseEndinginMonth() {
        var result = propertyService.findPropertyByLeaseEndinginMonth();

        return ResponseEntity.ok(new GenericResponse(result.size()+" Property Found", 200,result));
    }

    @GetMapping("/totalincome")
    public ResponseEntity<GenericResponse> findTotalincome() {
        var result = propertyService.findTotalincome();
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
    public ResponseEntity<GenericResponse> getById(@PathVariable int id) {
        GenericResponse result = new GenericResponse("success", 200, propertyService.getById(id));
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
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
