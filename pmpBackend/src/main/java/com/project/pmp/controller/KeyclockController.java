package com.project.pmp.controller;

import com.project.pmp.dto.GenericResponse;
import com.project.pmp.dto.UserDto;
import com.project.pmp.service.UserService;
import com.project.pmp.service.impl.RoleServiceImpl;
import com.project.pmp.service.impl.UserKeycloakServiceImpl;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1/keycloack-users",consumes = "*/*")
public class KeyclockController {

    @Autowired
    private UserKeycloakServiceImpl userKeycloakService;

    @Autowired
    private RoleServiceImpl roleService;
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<GenericResponse> getAll() {



        var result = userKeycloakService.getAll();
        return ResponseEntity.ok(new GenericResponse(result.size()+" User Found!",200,result));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse> findById(@PathVariable String id) {
        var result = userKeycloakService.getById(id);
        if(result.getId() != null ){
            return ResponseEntity.ok(new GenericResponse("User Found!", 200, result));
        }

        return  ResponseEntity.badRequest().body(new GenericResponse("User Not Found!", 500, null)) ;
    }

    @PostMapping("/{userId}/role/{roleName}")
    public ResponseEntity<GenericResponse> assignRole(@PathVariable String userId, @PathVariable String roleName) {
        RoleRepresentation role = roleService.getByRole(roleName);
        userKeycloakService.assignRole(userId, role);

        return ResponseEntity.ok(new GenericResponse(roleName+" Assigned for the selected user", 200,null));
    }


    @PostMapping
    public ResponseEntity<GenericResponse> create(@RequestBody Map<String,String> userRequest) {
        System.out.println("lol1");
        UserDto u = new UserDto();
        u.setEmail(userRequest.get("email").toString());
        u.setFirstName(userRequest.get("firstName").toString());
        u.setLastname(userRequest.get("lastName").toString());
        u.setPassword(userRequest.get("password").toString());

       if( userKeycloakService.create(u)){
           var checkUser = userService.getByEmail(u.getEmail());
           if(checkUser != null){

               return ResponseEntity.ok(new GenericResponse("User has been added succesfully",200,u));
           }

       }
        return ResponseEntity.badRequest().body(new GenericResponse(u.getEmail()+" already registred!", 500,null));
    }

//    @GetMapping(path = "/{userName}")
//    public List<UserRepresentation> getUser(@PathVariable("userName") String userName){
//        List<UserRepresentation> user = userKeycloakService.getByUsername(userName);
//        return user;
//    }

    @DeleteMapping(path = "/{userId}")
    public ResponseEntity<GenericResponse> deleteUser(@PathVariable("userId") String userId){
        if(userKeycloakService.deleteUser(userId)){
            return ResponseEntity.ok(new GenericResponse("User Deleted Successfully.",200,null));
        }
        return ResponseEntity.badRequest().body(new GenericResponse("There is a problem!",500,null));
    }

    @GetMapping(path = "/verification-link/{userId}")
    public ResponseEntity<GenericResponse> sendVerificationLink(@PathVariable("userId") String userId){

        if( userKeycloakService.sendVerificationLink(userId)){
            return ResponseEntity.ok(new GenericResponse("Verification link send Successfully.",200,null));
        }
        return ResponseEntity.badRequest().body(new GenericResponse("There is a problem!",500,null));
    }

    @GetMapping(path = "/reset-password/{userId}")
    public ResponseEntity<GenericResponse> sendResetPassword(@PathVariable("userId") String userId){


        if(  userKeycloakService.sendResetPassword(userId)){
            return ResponseEntity.ok(new GenericResponse("Password reset link send successfully.",200,null));
        }
        return ResponseEntity.badRequest().body(new GenericResponse("There is a problem!",500,null));
    }

}
