import { useState } from "react";
import { FormularioReserva } from "./components/FormularioReserva";
import { ListaReservas } from "./components/ListaReservas";

export default function App() {
  const [recargar, setRecargar] = useState(false);
  // Nuevo estado para guardar temporalmente la reserva que el usuario quiere modificar
  const [reservaAEditar, setReservaAEditar] = useState(null);

  const actualizarLista = () => {
    setRecargar((prev) => !prev);
    setReservaAEditar(null); // Limpiamos el formulario tras guardar o actualizar
  };

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <FormularioReserva 
        onReservaCreada={actualizarLista} 
        reservaAEditar={reservaAEditar}
        onCancelarEdicion={() => setReservaAEditar(null)}/>
      <ListaReservas 
        recargar={recargar} 
        onEditarReserva={(reserva) => setReservaAEditar(reserva)}
      />
    </div>
  );
}