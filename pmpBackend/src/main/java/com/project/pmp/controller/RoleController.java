package com.project.pmp.controller;

import com.project.pmp.dto.GenericResponse;
import com.project.pmp.service.impl.RoleServiceImpl;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

    @Autowired
    private RoleServiceImpl roleService;

    @GetMapping
    public ResponseEntity<GenericResponse> getAll() {
        var result =roleService.getAll();
        return ResponseEntity.ok(new GenericResponse(result.size()+" role found",200,result));
    }

    @PostMapping
    public ResponseEntity<GenericResponse> create(@RequestBody String role) {
        if(roleService.create(role)){
            return ResponseEntity.ok(new GenericResponse("Role has been created",200,role));

        }
        return ResponseEntity.badRequest().body(new GenericResponse("There is a problem!",500,null));
    }
}
