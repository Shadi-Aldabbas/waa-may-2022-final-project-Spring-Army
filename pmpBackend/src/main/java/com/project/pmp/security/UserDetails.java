package com.project.pmp.security;

import com.project.pmp.dto.UserDto;
import com.project.pmp.entity.Role;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;


@Component
public class UserDetails {
    @Autowired
    private HttpServletRequest httpServletRequest;


    public  UserDto getUserDetails(){


        KeycloakAuthenticationToken token = (KeycloakAuthenticationToken) httpServletRequest.getUserPrincipal();
        KeycloakPrincipal principal=(KeycloakPrincipal)token.getPrincipal();
        KeycloakSecurityContext session = principal.getKeycloakSecurityContext();
        AccessToken accessToken = session.getToken();
        String role = accessToken.getRealmAccess().getRoles().stream().findFirst().get();
        int roleId = role.equals("admin") ? 1 : role.equals("tenant") ? 2 : 3;
        String id = accessToken.getId();
        String emailID = accessToken.getEmail();
        String lastname = accessToken.getFamilyName();
        String firstname = accessToken.getGivenName();
        UserDto loUser = new UserDto();
        loUser.setEmail(emailID);
        loUser.setSetLastLoggedInAt(new Date());
        loUser.setFirstName(firstname);
        loUser.setLastname(lastname);
        loUser.setId(id);
        Role r = new Role();
        r.setId(roleId);
        r.setName(role);
        loUser.setRole(r);
        return loUser;
    }

}
