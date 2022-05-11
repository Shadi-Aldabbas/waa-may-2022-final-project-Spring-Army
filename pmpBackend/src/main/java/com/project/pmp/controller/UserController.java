package com.project.pmp.controller;

import com.project.pmp.dto.GenericResponse;
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
         GenericResponse result = new GenericResponse();
         result.setStatus("fail");
         result.setCode(-1);
         if(user.getId() > 0){
           result.setStatus("Success");
           result.setCode(200);
           result.setMessage("User added successfully");
           return result;
         }

         return result;
    }
    @DeleteMapping
    public void deleteById(@RequestParam int p) {
        userService.delete(p);
    }
    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getById(id));
    }
}
