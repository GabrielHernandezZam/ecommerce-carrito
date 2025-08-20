// ---------------------------
// Definir tipos
// ---------------------------

// Tipo de un producto
export type Producto = {
  id: number;        // Identificador único del producto
  nombre: string;    // Nombre del producto
  precio: number;    // Precio del producto
  cantidad: number;  // Cantidad que hay en el carrito
};

// Tipo de acciones que puede recibir el reducer
export type Action =
  | { type: "ADD"; payload: Producto }                 // Agregar un producto
  //Payload es la accion que se le pasa al reducer, en este caso un producto
  | { type: "DELETE"; payload: { id: number } }       // Eliminar un producto
  | { type: "INCREMENT"; payload: { id: number } }    // Aumentar cantidad
  | { type: "DECREMENT"; payload: { id: number } };   // Disminuir cantidad

// ---------------------------
// Reducer
// ---------------------------
// Función que recibe el estado actual y la acción, y devuelve el nuevo estado
export const reducer = (state: Producto[], action: Action): Producto[] => {
  switch (action.type) {

    case "ADD":
      // Verificamos si el producto ya está en el carrito
      const existe = state.find(p => p.id === action.payload.id);

      if (existe) {
        // Si ya existe, solo aumentamos la cantidad
        return state.map(p =>
          p.id === action.payload.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }

      // Si no existe, lo agregamos con cantidad 1
      return [...state, { ...action.payload, cantidad: 1 }];

    case "DELETE":
      // Filtramos el carrito para eliminar el producto con el id dado
      return state.filter(p => p.id !== action.payload.id);

    case "INCREMENT":
      // Incrementamos la cantidad del producto seleccionado
      return state.map(p =>
        p.id === action.payload.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );

    case "DECREMENT":
      // Disminuimos la cantidad pero nunca por debajo de 1
      return state.map(p =>
        p.id === action.payload.id && p.cantidad > 1
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      );

    default:
      // Si la acción no coincide, devolvemos el estado actual
      return state;
  }
};
