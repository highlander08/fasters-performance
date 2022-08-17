import { createContext, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
// import useLocalStorage from "./hooks/useLocalStorage";
export const MyContext = createContext([null]);

export function MyContextProvider(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [values, setValues] = useState({
    titulo: null,
    Description: null,
    agendaFmtYMD: null,
    horas: null,
  });

  const [allEvent, setAllEvent] = useLocalStorage("allEvent", []);

  return (
    <MyContext.Provider
      value={{
        allEvent,
        setAllEvent,
        open,
        setOpen,
        handleClose,
        handleOpen,
        submitted,
        valid,
        values,
        setValues,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
