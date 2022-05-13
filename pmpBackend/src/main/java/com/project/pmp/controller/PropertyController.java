package com.project.pmp.controller;

import com.project.pmp.dto.GenericResponse;
import com.project.pmp.dto.PropertyDto;
import com.project.pmp.entity.Property;
import com.project.pmp.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping
    public GenericResponse save(@RequestBody Property p) {


        var property = propertyService.save(p);

        if(property.getId() > 0){
            return  new GenericResponse("successfuly registered", 200, property);
        }

        return  new GenericResponse("property has failed to register", 500, null);
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
