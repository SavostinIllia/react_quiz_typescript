import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  registerSuccess: false,
  isLoading: false,
  validEmail: false,
  token: null,
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const LoggingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_HANDLER": {
      return {
        ...state,
        isLoading: false,
        registerSuccess: true,
      };
    }
    case "RESET_REGISTER": {
      return {
        ...state,
        registerSuccess: false,
      };
    }
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
        token: null,
      };
    }
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoggingReducer, initialState);

  const LoggingHandler = async (email, password) => {
    setLoading();
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBxQlrYg-i-k_7IFNSWK_xHTT0v5tNhOg`,
        authData
      );
      const responseData = response.data;
      const expirationDate = new Date(
        new Date().getTime() + responseData.expiresIn * 1000
      );
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("expirationDate", expirationDate);
      setIsLoggedIn(responseData.idToken);
      dispatch({ type: "LOGIN_HANDLER" });
      autoLogOut(responseData.expiresIn);
    } catch (err) {
      setErrorLoggedIn();
    }
  };

  const RegisterHandler = async (email, password) => {
    setLoading();
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
        AIzaSyDBxQlrYg-i-k_7IFNSWK_xHTT0v5tNhOg`,
        authData
      );
      dispatch({ type: "REGISTER_HANDLER" });
      setTimeout(() => {
        dispatch({ type: "RESET_REGISTER" });
      }, 2000);
    } catch (err) {
      console.log("err", err.response);
      setErrorLoggedIn();
    }
  };
  const autoLogOut = (time) => {
    setTimeout(() => {
      logOut();
    }, time * 1000);
  };
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    dispatch({ type: "LOG_OUT" });
  };
  const setLoading = () => dispatch({ type: "IS_LOADING" });
  const setIsLoggedIn = (token) => {
    dispatch({ type: "IS_LOGGEDIN", token });
  };
  const setErrorLoggedIn = () => dispatch({ type: "ERROR_LOGGIN" });

  const resetEmailValid = () => dispatch({ type: "RESET_EMAIL_VALID" });

  const { isLoading, isLoggedIn, validEmail, registerSuccess } = state;

  return (
    <AuthContext.Provider
      value={{
        LoggingHandler,
        isLoading,
        isLoggedIn,
        validEmail,
        resetEmailValid,
        logOut,
        RegisterHandler,
        registerSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
