import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // Estado para armazenar nosso valor
  // Passe a função inicial do estado para usar o Estado para que a lógica só seja executada uma vez
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Obter do armazenamento local por chave
      const item = window.localStorage.getItem(key);
      // Parse armazenado json ou se nenhum retorno inicialVava Valor
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se o erro também retornar inicialVassa
      console.log(error);
      return initialValue;
    }
  });

  // Devolva uma versão embrulhada da função de setter do UseState que ...
  // ... persiste o novo valor para localStorage.
  const setValue = (value) => {
    try {
      // Permitir que o valor seja uma função para que tenhamos a mesma API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // salvar para o  estado
      setStoredValue(valueToStore);
      // Salvar  para o local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;