import { CarritoProvider } from './Context/CarritoContext'
import Carrito from './components/Carrito'
import './App.css'

function App() {

  return (
    <CarritoProvider>
      <Carrito />
    </CarritoProvider>
  )
}

export default App
