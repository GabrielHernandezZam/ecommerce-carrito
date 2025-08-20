import { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import type { Producto } from "../Reducer/CarritoReducer";

const articulos: Producto[] = [
  { id: 1, nombre: "Manzana", precio: 10, cantidad: 0 },
  { id: 2, nombre: "Pera", precio: 2, cantidad: 0 },
  { id: 3, nombre: "Aguacate", precio: 52, cantidad: 0 },
  { id: 4, nombre: "Platano", precio: 8, cantidad: 0 },
];

const Carrito = () => {
  const { state, dispatch } = useContext(CarritoContext)!;

  return (
    <div>
      <h1>Carrito de compras</h1>
      {state.map(p => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          <p>{p.nombre} - Cantidad {p.cantidad}</p>
          <button onClick={() => dispatch({ type: "INCREMENT", payload: { id: p.id } })}>➕</button>
          <button onClick={() => dispatch({ type: "DECREMENT", payload: { id: p.id } })} style={{ marginLeft: "2px" }}>➖</button>
          <button onClick={() => dispatch({ type: "DELETE", payload: { id: p.id } })} style={{ marginLeft: "2px" }}>🗑️</button>
        </div>
      ))}
      <div>
        {articulos.map(art => (
          <button
            key={art.id}
            onClick={() => dispatch({ type: "ADD", payload: art })}
            style={{ marginBottom: "5px", display: "block" }}
          >
            {art.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carrito;
