import { useState } from "react";
import { FormularioReserva } from "./components/FormularioReserva";
import { ListaReservas } from "./components/ListaReservas";

export default function App() {
  const [recargar, setRecargar] = useState(false);

  const actualizarLista = () => {
    setRecargar((prev) => !prev);
  };

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <FormularioReserva onReservaCreada={actualizarLista} />
      <ListaReservas recargar={recargar} />
    </div>
  );
}