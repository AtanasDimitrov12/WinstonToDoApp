import React, { useEffect, useCallback, useState } from "react";

const initialGlobalState = {
  todos: []
};

const GlobalState = React.createContext();

const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState(initialGlobalState);

  const setGlobalState = useCallback((data = {}) => {
    const newState = { ...state };
    Object.keys(data).forEach((key) => {
      newState[key] = data[key];
    });
    setState(newState);
  }, [state]);

  useEffect(() => {
    GlobalState.set = setGlobalState;
  }, [setGlobalState]);

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};

const useGlobalState = () => React.useContext(GlobalState);

export { GlobalStateProvider, useGlobalState, GlobalState };

window.GlobalState = GlobalState;
