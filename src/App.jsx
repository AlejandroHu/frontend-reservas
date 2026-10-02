import { useState } from "react";
import { FormularioReserva } from "./components/FormularioReserva";
import { ListaReservas } from "./components/ListaReservas";
import { Toast } from "./components/Toast";

export default function App() {
  const [recargar, setRecargar] = useState(false);
  // Nuevo estado para guardar temporalmente la reserva que el usuario quiere modificar
  const [reservaAEditar, setReservaAEditar] = useState(null);

  // Estado para controlar la notificación flotante
  const [notificacion, setNotificacion] = useState(null); 
  // Estructura esperada: { mensaje: "...", tipo: "exito" | "error" }

  const mostrarNotificacion = (mensaje, tipo = "exito") => {
    setNotificacion({ mensaje, tipo });
  };

  const actualizarLista = () => {
    setRecargar((prev) => !prev);
    setReservaAEditar(null); // Limpiamos el formulario tras guardar o actualizar
  };

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <FormularioReserva 
        onReservaCreada={actualizarLista} 
        reservaAEditar={reservaAEditar}
        onCancelarEdicion={() => setReservaAEditar(null)}
        onNotificar={mostrarNotificacion}/>
      <ListaReservas 
        recargar={recargar} 
        onEditarReserva={(reserva) => setReservaAEditar(reserva)}
        onNotificar={mostrarNotificacion}
        onReservaEliminada={actualizarLista}
      />
      {/* Renderizado condicional de la notificación */}
      {notificacion && (
        <Toast
          mensaje={notificacion.mensaje}
          tipo={notificacion.tipo}
          onClose={() => setNotificacion(null)}
        />
      )}
    </div>
  );
}