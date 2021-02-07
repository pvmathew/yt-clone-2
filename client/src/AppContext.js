import React, { useState, createContext, useEffect } from "react";
import { getResults } from "./api/search";
export const Context = createContext();

export const Provider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("auth")) || false
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("auth", isLoggedIn);
    // console.log("isLoggedIn has changed to: " + isLoggedIn);
  }, [isLoggedIn]);

  const login = async () => setLoggedIn(true);
  const logout = async () => setLoggedIn(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getResults(searchTerm);
      setResults(data);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        message,
        setMessage,
        searchTerm,
        setSearchTerm,
        results,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
