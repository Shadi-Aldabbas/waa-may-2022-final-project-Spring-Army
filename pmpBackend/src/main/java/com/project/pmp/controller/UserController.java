package com.project.pmp.controller;

import com.project.pmp.dto.GenericResponse;
import com.project.pmp.dto.PasswordResetDto;
import com.project.pmp.dto.PropertyDto;
import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.User;
import com.project.pmp.service.SmsService;
import com.project.pmp.service.UserService;
import com.telesign.MessagingClient;
import com.telesign.RestClient;
import com.telesign.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private SmsService smsService;

    @PostMapping
    public GenericResponse save(@RequestBody User p) {
        p.setActive(true);
         var user = userService.save(p);

         if(user.getId() > 0){
           return  new GenericResponse("successfuly registered", 200, user);
         }

         return  new GenericResponse("user has failed to register", 500, null);
    }
    @DeleteMapping
    public void deleteById(@RequestParam int p) {
        userService.delete(p);
    }
    @GetMapping
    public ResponseEntity<GenericResponse> getAll() {
        var result = userService.getAll();

        return ResponseEntity.ok(new GenericResponse(result.size()+" User Found", 200,result));
    }

    @GetMapping("/most10Tenant")
    public ResponseEntity<GenericResponse> findTop10MostTenant() {
        var result = userService.findTop10MostTenant();

        return ResponseEntity.ok(new GenericResponse(result.size()+" User Found", 200,result));
    }
    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse> getById(@PathVariable int id) {
        GenericResponse result = new GenericResponse("success", 200, userService.getById(id));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/filter")
    public ResponseEntity<GenericResponse> getLastTenLoggedIn() {
        GenericResponse result = new GenericResponse("success", 200, userService.getLastTenLoggedIn());
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public GenericResponse update(@PathVariable int id, @RequestBody UserDto userDto){
        var user = userService.update(id, userDto);
        if(user.getId()>0){
            return new GenericResponse("success", 200,user );
        }
        else{
            return new GenericResponse("fail baby", 500,null );
        }
    }

    @GetMapping("/password")
    public ResponseEntity<GenericResponse> passwordReset(){

        var testUser = new UserDto();
        testUser.setPhone("16418192194");
        var result = smsService.send(testUser,"Dear Shadi, your property has been rented by Hasim, Thank you!");
        if(result.isSent()){
            return ResponseEntity.ok(new GenericResponse("Message has been sent succesfully!",200,null));
        }
        return ResponseEntity.status(500).body(new GenericResponse("Sorry we can not send the message right now!",500,null));
    }

}
