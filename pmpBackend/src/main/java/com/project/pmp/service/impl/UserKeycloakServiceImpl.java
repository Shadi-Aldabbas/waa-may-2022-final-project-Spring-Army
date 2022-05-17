package com.project.pmp.service.impl;

import com.project.pmp.dto.UserDto;
import okhttp3.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserKeycloakServiceImpl {

    @Autowired
    private Keycloak keycloak;
    @Value("${keycloak.realm}")
    private String realm;

    public List<UserRepresentation> getAll() {

        return keycloak
                .realm(realm)
                .users()
                .list();
    }

    public List<UserRepresentation> getByUsername(String username){
       return keycloak
                .realm(realm)
                .users()
                .search(username);
    }

    public UserRepresentation getById(String id){
        return keycloak
                .realm(realm)
                .users()
                .get(id)
                .toRepresentation();
    }

    public void assignRole(String userId, RoleRepresentation roleRepresentation) {
        keycloak
                .realm(realm)
                .users()
                .get(userId)
                .roles()
                .realmLevel()
                .add(List.of(roleRepresentation));
    }

    public Boolean create(UserDto request) {
        System.out.println("lol");
        CredentialRepresentation password = preparePasswordRepresentation(request.getPassword());
        UserRepresentation user = prepareUserRepresentation(request, password);
        keycloak
                .realm(realm)
                .users()
                .create(user);

        return true;
    }

    public boolean deleteUser(String userId){
//        UsersResource usersResource = getInstance();
//        usersResource.get(userId)
//                .remove();
        keycloak.realm(realm)
                .users()
                .get(userId)
                .remove();

        return true;
    }

    public boolean sendResetPassword(String userId){
        keycloak.realm(realm)
                .users()
                .get(userId)
                .executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));

        return true;

    }

    public boolean sendVerificationLink(String userId){
        keycloak.realm(realm)
                .users()
                .get(userId)
                .sendVerifyEmail();
//        UsersResource usersResource = getInstance();
//
//        usersResource.get(userId)
//                .executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));

        return true;
    }
    private CredentialRepresentation preparePasswordRepresentation(String password)  {
        CredentialRepresentation cR = new CredentialRepresentation();
        cR.setTemporary(false);
        cR.setType(CredentialRepresentation.PASSWORD);
        cR.setValue(password);
        return cR;
    }

    private UserRepresentation prepareUserRepresentation(UserDto request, CredentialRepresentation cR)  {
        UserRepresentation newUser = new UserRepresentation();
        newUser.setUsername(request.getFirstName());
        newUser.setEmail(request.getEmail());
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastname());
        newUser.setCredentials(List.of(cR));
        newUser.setEnabled(true);
        return newUser;
    }



}
