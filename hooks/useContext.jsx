import { createContext, useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
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
    horasEnd: null,
  });
  const [busca, setBusca] = useState('');
  const [allEvent, setAllEvent] = useLocalStorage('allEvent', []);

  const EventFilter = allEvent.filter((evento) => {
    const event = evento.titulo.includes(busca);
    if (event) {
      return event;
    }
    return;
  });

  return (
    <MyContext.Provider
      value={{
        EventFilter,
        busca,
        setBusca,
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
