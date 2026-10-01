import { useState, useEffect } from "react";
import { reservasService } from "../services/reservasService";

export function ListaReservas({ recargar, onEditarReserva }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarReservas = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await reservasService.getAll();
      setReservas(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, [recargar]);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres cancelar esta reserva?");
    if (!confirmar) return;

    try {
      await reservasService.delete(id);
      cargarReservas();
    } catch (err) {
      console.error(err);
      alert("Error al intentar eliminar la reserva.");
    }
  };

  return (
    <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>Reservas Confirmadas</h3>
      
      {/* Estado: Cargando */}
      {cargando && (
        <p style={{ color: '#2563eb', fontSize: '14px' }}>⏳ Cargando reservas...</p>
      )}

      {/* Estado: Error */}
      {error && !cargando && (
        <div style={{ padding: '12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Estado: Sin datos */}
      {!cargando && !error && reservas.length === 0 && (
        <p style={{ color: '#64748b', fontSize: '14px' }}>No hay reservas registradas.</p>
      )}

      {/* Estado: Lista de reservas */}
      {!cargando && !error && reservas.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reservas.map((reserva) => (
            <div 
              key={reserva.id} 
              style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}
            >
              <div>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>{reserva.cliente}</div>
                <div style={{ fontSize: '14px', color: '#2563eb', marginTop: '2px' }}>{reserva.servicio}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  📅 {reserva.fecha} — ⏰ {reserva.hora}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <button
                  onClick={() => onEditarReserva && onEditarReserva(reserva)}
                  style={{
                    backgroundColor: '#3b82f6', color: 'white', border: 'none',
                    borderRadius: '6px', padding: '6px 12px', fontSize: '12px',
                    fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(reserva.id)}
                  style={{
                    backgroundColor: '#ef4444', color: 'white', border: 'none',
                    borderRadius: '6px', padding: '6px 12px', fontSize: '12px',
                    fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}