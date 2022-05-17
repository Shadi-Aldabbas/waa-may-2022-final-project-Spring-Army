package com.project.pmp.aspect;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.Role;
import com.project.pmp.security.UserDetails;
import com.project.pmp.service.UserService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Aspect
@Component
public class UserUpdateAspect {

    @Autowired
    private HttpServletRequest httpServletRequest;
    @Autowired
    private UserService userService;

    @Autowired
    private UserDetails userDetails;


    @Pointcut("within(com.project.pmp.controller.*)")
    private static void chechUserUpdate(){}

    @Before("chechUserUpdate()")
    public void registerorUpdateUser(JoinPoint joinPoint) throws Throwable {

        UserDto loUser = userDetails.getUserDetails();
        UserDto result = userService.getById(loUser.getId());
        if(result != null){
            result.setSetLastLoggedInAt(new Date());
            userService.update(loUser.getId(), result);
        }else{
            userService.save(loUser);
        }

    }
}
