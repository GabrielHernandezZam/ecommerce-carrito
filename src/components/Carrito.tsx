import { useReducer } from "react";

//Definimo los productos
type Producto = {
  id: number;
  nombre: string;
  precio: string;
  cantidad: number;
};

//Es el estado del carrito, el arreglo de productos que contiene el carrito
type State = Producto[];

type Action =
  //Usamos el " | " para defir puede ser uno o otro tipo
  | { type: "ADD"; payload: Producto }
  | { type: "DELETE"; payload: { id: number } }
  | { type: "INCREMENT"; payload: { id: number } }
  | { type: "DECREMENT"; payload: { id: number } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD":
      //Debemos primero revisar si existe el
      const existe = state.find((p) => p.id === action.payload.id);

      if (existe)
        return state.map((p) =>
          p.id === action.payload.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );

      // ...state
      // Con este copias todos los productos que ya estan el carrito
      // { ...action.payload, cantidad: 1 }
      // Copia todas las propiedades del producto que quieres agregar y le pone la cantidad en 1
      return [...state, { ...action.payload, cantidad: 1 }];

    case "DELETE": {
      // Eliminamos un producto filtrando el carrito por ID
      // Explicación:
      // .filter() recorre cada producto del carrito (state).
      // Para cada producto, compara su id con el id que queremos eliminar (action.payload.id).
      // Si el id ES DIFERENTE (!==), el producto se queda en el nuevo array.
      // Si el id ES IGUAL, el producto se elimina (no se incluye en el nuevo array).
      // Así, solo se elimina el producto que coincide con el id dado.
      return state.filter((p) => p.id !== action.payload.id);
    }
    case "INCREMENT":
      // Explicación:
      // .map() recorre cada producto del carrito (state).
      // Para cada producto, compara su id con el id que queremos incrementar (action.payload.id).
      // Si el id ES IGUAL, crea un nuevo objeto copiando todas sus propiedades y suma 1 a cantidad.
      // Si el id ES DIFERENTE, deja el producto tal como está.
      // Así, solo el producto seleccionado aumenta su cantidad.
      return state.map((p) =>
        p.id === action.payload.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );

    case "DECREMENT":
      // Explicación:
      // .map() recorre cada producto del carrito (state).
      // Para cada producto, compara su id con el id que queremos decrementar (action.payload.id).
      // Si el id ES IGUAL y la cantidad es mayor a 1, crea un nuevo objeto copiando todas sus propiedades y resta 1 a cantidad.
      // Si el id ES DIFERENTE, deja el producto tal como está.
      // Así, solo el producto seleccionado disminuye su cantidad, pero nunca baja de 1.
      return state.map((p) =>
        p.id === action.payload.id && p.cantidad > 1
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      );

    default:
      return state; // Si la acción no coincide con ningún caso, retornamos el estado actual
  }
};

const Carrito = () => {
  const articulos: Producto[] = [
    { id: 1, nombre: "manzana", precio: "10", cantidad: 0 },
    { id: 2, nombre: "pera", precio: "2", cantidad: 0 },
    { id: 3, nombre: "aguacate", precio: "52", cantidad: 0 },
    { id: 4, nombre: "platano", precio: "8", cantidad: 0 },
  ];

  const [state, dispatch] = useReducer(reducer, []);

  return (
    <div>
      <h1>Carrito de compras</h1>
      {state.map((p) => (
        <div style={{ marginBottom: "10px" }}>
          <p key={p.id}>
            {p.nombre} - Cantidad {p.cantidad}
          </p>
          <button
            onClick={() =>
              dispatch({ type: "INCREMENT", payload: { id: p.id } })
            }
          >
            ➕
          </button>
          <button
            onClick={() =>
              dispatch({ type: "DECREMENT", payload: { id: p.id } })
            }
            style={{ marginLeft: "2px" }}
          >
            ➖
          </button>
          <button
            onClick={() => dispatch({ type: "DELETE", payload: { id: p.id } })}
            style={{ marginLeft: "2px" }}
          >
            🗑️
          </button>
        </div>
      ))}
      <div>
        {articulos.map((art) => (
          <div style={{ marginBottom: "10px" }}>
            <button
              onClick={() =>
                dispatch({
                  type: "ADD",
                  payload: {
                    id: art.id,
                    nombre: art.nombre,
                    precio: art.precio,
                    cantidad: art.cantidad,
                  },
                })
              }
            >
              {art.nombre}
            </button>
            <div style={{ marginTop: "2px" }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Carrito;
