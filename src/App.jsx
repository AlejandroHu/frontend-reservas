import { useState } from "react";
import { FormularioReserva } from "./components/FormularioReserva";
import { ListaReservas } from "./components/ListaReservas";
import { Toast } from "./components/Toast";
import { reservasService } from "./services/reservasService"; // Importamos el servicio
import { useEffect } from "react";

export default function App() {
  const [recargar, setRecargar] = useState(false);
  // Nuevo estado para guardar temporalmente la reserva que el usuario quiere modificar
  const [reservaAEditar, setReservaAEditar] = useState(null);

  // Estado para controlar la notificación flotante
  const [notificacion, setNotificacion] = useState(null); 
  // Estructura esperada: { mensaje: "...", tipo: "exito" | "error" }

  // 1. Estado para guardar la lista de reservas en App
  const [reservas, setReservas] = useState([]);

  // 2. Función para cargar las reservas desde la API
  const obtenerReservas = async () => {
    try {
      const data = await reservasService.getAll();
      setReservas(data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  // 3. Cargamos la lista al iniciar o al cambiar 'recargar'
  useEffect(() => {
    obtenerReservas();
  }, [recargar]);

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
        onNotificar={mostrarNotificacion}
        reservas={reservas} // <-- PASAMOS LAS RESERVAS AQUÍ
        />
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