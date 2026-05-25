import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup

  async function signup(username, password) {
    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw Error("Signup failed");
      }

      setToken(result.token);
      setLocation("TABLET");
    } catch (error) {
      console.error(error);
    }
  }      
      
      // TODO: authenticate
  async function authenticate() {
    try {
      const response = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`,},
      });
      const result = await response.json();
      if (!response.ok) {
        throw Error("Authentication failed");
      }
      console.log(result);
      setLocation("TUNNEL");
    } catch (error) {
      console.error(error);
    }
  }
  
       

  const value = { location, token, signup, authenticate };
  return (
 <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
