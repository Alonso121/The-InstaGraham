import React, { useReducer, createContext } from "react";

export const ACTIONS = {
  LOGGED_IN: "logged-in",
};

function reducer(state, action) {
  switch (action.type) {
    case "logged-in":
      return {
        isLoggedIn: true,
        userData: action.payload,
      };

    case "logged-out":
      return { isLoggedIn: false, userData: "" };

    default:
      return state;
  }
}

export const StateContext = createContext();

export const DispatchContext = createContext();

/* export function useReducerState() {
  return useContext(StateContext);
}

export function useDispatch() {
  return useContext(DispatchContext);
} */

export function ReducerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    isLoggedIn: false,
    userData: "",
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
