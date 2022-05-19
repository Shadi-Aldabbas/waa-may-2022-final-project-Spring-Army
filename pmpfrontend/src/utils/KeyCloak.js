import Keycloak from "keycloak-js";
const   keycloak = new Keycloak({
    "realm": "pmp",
    "auth-server-url": "http://127.0.0.1:8024/auth/",
    "ssl-required": "external",
    "clientId": "pmpapp-react",
    "public-client": true,
    "verify-token-audience": true,
    "use-resource-role-mappings": true,
    "confidential-port": 0
});

export default keycloak;