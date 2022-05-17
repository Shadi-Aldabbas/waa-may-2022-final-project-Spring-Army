package com.project.pmp.aspect;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.Role;
import com.project.pmp.service.UserService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
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


    @Pointcut("within(com.project.pmp.controller.*)")
    private static void chechUserUpdate(){}

    @After("chechUserUpdate()")
    public void registerorUpdateUser(JoinPoint joinPoint) throws Throwable {

        System.out.println(httpServletRequest.getUserPrincipal().getName());
        KeycloakAuthenticationToken token = (KeycloakAuthenticationToken) httpServletRequest.getUserPrincipal();
        KeycloakPrincipal principal=(KeycloakPrincipal)token.getPrincipal();
        KeycloakSecurityContext session = principal.getKeycloakSecurityContext();

        AccessToken accessToken = session.getToken();
        String role = accessToken.getRealmAccess().getRoles().stream().findFirst().get();
        int roleId = role.equals("admin") ? 1 : role.equals("tenant") ? 2 : 3;
        System.out.println(roleId + "--- " + role);
        String id = accessToken.getId();
        String username = accessToken.getPreferredUsername();
        String emailID = accessToken.getEmail();
        String lastname = accessToken.getFamilyName();
        String firstname = accessToken.getGivenName();
        UserDto loUser = new UserDto();
        UserDto result = userService.getById(id);


        if(result != null){
//            loUser.setCreatedAt(result.getCreatedAt());
//            loUser.setActive(result.isActive());
            result.setSetLastLoggedInAt(new Date());
            userService.update(id,result);
        }else{
            loUser.setEmail(emailID);
            loUser.setSetLastLoggedInAt(new Date());
            loUser.setFirstName(firstname);
            loUser.setLastname(lastname);
            loUser.setId(id);
            Role r = new Role();

            r.setId(roleId);
            r.setName(role);
            loUser.setRole(r);
            userService.save(loUser);
        }


        AccessToken.Access realmAccess = accessToken.getRealmAccess();
        System.out.println(id);
        System.out.println(realmAccess.getRoles().stream().findFirst().get() + username + emailID + lastname);
    }
}
