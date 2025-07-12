import React from "react";
import type { TaskInfo } from "./types";

export const Context = React.createContext<Map<number, TaskInfo> | null>(null);

export const LanguageContextProvider = (props) => {

  const setLanguage = (language) => {
    setState({...state, language: language})
  }

  const initState = {
    language: "en",
    setLanguage: setLanguage
  } 

  const [state, setState] = useState(initState)

  return (
    <LanguageContext.Provider value={state}>
      {props.children}
    </LanguageContext.Provider>
  )
}