import { createContext, useReducer } from "react";
import type { ReactNode } from "react";   // Solo tipo
import type { Producto, Action } from "../Reducer/CarritoReducer";
import { reducer } from "../Reducer/CarritoReducer";

// ---------------------------
// Tipo del contexto
// ---------------------------
type CarritoContextType = {
  state: Producto[];                // Estado global del carrito
  dispatch: React.Dispatch<Action>; // Función para ejecutar acciones
};

// ---------------------------
// Creamos el contexto
// ---------------------------
export const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

// ---------------------------
// Provider
// ---------------------------
// Envolvemos los componentes hijos y compartimos state y dispatch
export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, []);  // Estado inicial vacío

  return (
    <CarritoContext.Provider value={{ state, dispatch }}>
      {children}   {/* Todos los hijos pueden acceder al carrito */}
    </CarritoContext.Provider>
  );
};
