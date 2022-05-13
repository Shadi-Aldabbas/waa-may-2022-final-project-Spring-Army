package com.project.pmp.controller;

import com.project.pmp.dto.GenericResponse;
import com.project.pmp.dto.PropertyDto;
import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.User;
import com.project.pmp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public GenericResponse save(@RequestBody User p) {


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
}
