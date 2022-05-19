package com.project.pmp.service.impl;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl {

    @Autowired
    private Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public boolean create(String name) {
        RoleRepresentation role = new RoleRepresentation();
        role.setName(name);
        keycloak.realm(realm)
                .roles()
                .create(role);

        return true;
    }

    public List<RoleRepresentation> getAll() {
        return keycloak.realm(realm)
                .roles()
                .list();
    }
    public RoleRepresentation getByRole(String roleName) {
        return keycloak.realm(realm)
                    .roles()
                    .get(roleName)
                    .toRepresentation();
    }


}
