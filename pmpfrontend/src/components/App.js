import React, { useEffect, useState, useContext } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Keycloak from "keycloak-js";
import { UserContext } from "../ourUserContext";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  // var { isAuthenticated } = useUserState();
  const [mystate, setMystate] = useState({
    keycloak: null,
    isAuthenticated: true,
  });
  const [user, setUser] = useState({
    name: "",
  });

  const { setUserData } = useContext(UserContext);
  useEffect(() => {
    const keycloak = Keycloak("/keycloak.json");
    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        promiseType: "native",
      })
      .then((authenticated) => {
        setMystate({ keycloak: keycloak, isAuthenticated: authenticated });
        if (mystate.isAuthenticated) {
          console.log(keycloak);
          localStorage.setItem("auth-token", keycloak.token);
          setUserData({
            name:keycloak.idTokenParsed.preferred_username,
            roles:keycloak.realmAccess.roles,
            token:keycloak.token,
            refreshToken:keycloak.refreshToken,
            logout: () => {

              // keycloak.authenticated(false);
              keycloak.logout();
              return keycloak.createLogoutUrl();
            }
          })
        }
      });


  }, []);
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          mystate.isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          mystate.isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
