import React, { createContext,useState,useEffect } from "react";

  const UserContext = createContext();
  const UserProvider = ({ children }) => {
   
  const [ state,setState]=useState({
    isUser:{},token:"",
  })
  useEffect(()=>{
    setState(JSON.parse(window.localStorage.getItem("auth")))
  },[])
   
  
    return (
      <UserContext.Provider value={[state,setState ]}>
        {children}
      </UserContext.Provider>
    );
  };
  export {UserContext,UserProvider}