import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  validEmail: false,
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const LoggingReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_HANDLER": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "IS_LOGGEDIN": {
      return {
        ...state,
        isLoggedIn: true,
        validEmail: false,
        token: action.token,
      };
    }
    case "IS_LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ERROR_LOGGIN": {
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        validEmail: true,
      };
    }
    case "RESET_EMAIL_VALID": {
      return {
        ...state,
        validEmail: false,
      };
    }
    case "LOG_OUT": {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoggingReducer, initialState);

  const LoggingHandler = async (authData) => {
    setLoading();
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBxQlrYg-i-k_7IFNSWK_xHTT0v5tNhOg`,
        authData
      );
      const responseData = response.data;
      const expirationDate = new Date(
        new Date().getTime() + responseData.expiresIn * 1000
      );
      console.log("responseData", responseData);
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("expirationDate", expirationDate);
      setIsLoggedIn(responseData.idToken);
      dispatch({ type: "LOGIN_HANDLER" });
    } catch (err) {
      setErrorLoggedIn();
    }
  };

  const setLoading = () => dispatch({ type: "IS_LOADING" });
  const setIsLoggedIn = (token) => {
    dispatch({ type: "IS_LOGGEDIN", token });
  };
  const setErrorLoggedIn = () => {
    console.log("No");
    dispatch({ type: "ERROR_LOGGIN" });
  };
  const resetEmailValid = () => dispatch({ type: "RESET_EMAIL_VALID" });
  const logOut = () => dispatch({ type: "LOG_OUT" });
  const { isLoading, isLoggedIn, validEmail } = state;
  return (
    <AuthContext.Provider
      value={{
        LoggingHandler,
        isLoading,
        isLoggedIn,
        validEmail,
        resetEmailValid,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
