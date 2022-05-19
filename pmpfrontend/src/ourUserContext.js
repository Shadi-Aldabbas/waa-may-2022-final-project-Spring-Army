import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserInfoProvider = (props) => {
  const [userData, setUserData] = useState({
      roles:[],
      token:"",
      refreshToken:"",
  });
  const value = {
    userData,
    setUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};
