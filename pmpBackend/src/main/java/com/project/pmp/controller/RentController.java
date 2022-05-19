package com.project.pmp.controller;

import com.project.pmp.dto.GenericResponse;
import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.Rent;
import com.project.pmp.entity.Property;
import com.project.pmp.entity.User;
import com.project.pmp.security.Constants;
import com.project.pmp.security.UserDetails;
import com.project.pmp.service.RentService;
import com.project.pmp.service.SmsService;
import com.project.pmp.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/v1/rent")
@CrossOrigin
public class RentController {

    @Autowired
    private RentService rentService;
    @Autowired
    private UserService userService;
    @Autowired
    private SmsService smsService;
    @Autowired
    private UserDetails userDetails;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    @RolesAllowed({Constants.ADMIN, Constants.TENANT, Constants.LANDLOARD})
    public ResponseEntity<GenericResponse> save(@RequestBody Rent p) {
        p.setTenant(modelMapper.map(userDetails.getUserDetails(), User.class));
        p.setOwner(modelMapper.map(userService.getById(p.getOwner().getId()), User.class));
        var rent = rentService.save(p);
        if(rent != null){
            var owner = userService.getById(p.getOwner().getId());
            var landLord = userService.getById(p.getTenant().getId());
            String message = "Dear "+landLord.getFirstName() +" you have rented the property, Thank you";
            String messageForLandLord = "Dear "+owner.getFirstName() +" your property has been rented by "+owner.getFirstName() +" ,Thank you";
            smsService.send(owner,message);
            smsService.send(landLord,message);
            return  ResponseEntity.ok(new GenericResponse("successfuly rented", 200, rent));
        }
        return  ResponseEntity.status(500).body(new GenericResponse("There is an error in renting progress", 500, null));
    }

    @DeleteMapping
    @RolesAllowed({Constants.ADMIN, Constants.LANDLOARD})
    public ResponseEntity<GenericResponse> deleteById(@RequestParam int p) {
        if(rentService.delete(p)){
           return ResponseEntity.ok(new GenericResponse("The field deleted succesfully!",200,null));
        }else{
            return ResponseEntity.status(500).body(new GenericResponse("There is an error with the deleting progress", 500, null));
        }
    }

    @GetMapping
    @RolesAllowed({Constants.ADMIN, Constants.TENANT, Constants.LANDLOARD})
    public ResponseEntity<GenericResponse> getAll() {
        var result = rentService.getAll();
        return ResponseEntity.ok(new GenericResponse(result.size()+" rent progress found!", 200,result));
    }

    @GetMapping("/weekhistory")
    public ResponseEntity<GenericResponse> getThisWeekRentedProperty() {
        var result = rentService.findByStartDateAfter();
        System.out.println(result);
        result.forEach(System.out::println);
        return ResponseEntity.ok(new GenericResponse(result.size()+" rent progress found!", 200,result));
    }
}
