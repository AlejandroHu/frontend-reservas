import { useState, useEffect } from "react";

export function ListaReservas({ recargar, onEditarReserva }) {
  const [reservas, setReservas] = useState([]);

  const cargarReservas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/reservas');
      if (response.ok) {
        const data = await response.json();
        setReservas(data);
      }
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, [recargar]);

  // Nueva función para eliminar una reserva por su ID
  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres cancelar esta reserva?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:8080/api/reservas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Volvemos a pedir las reservas actualizadas a MySQL
        cargarReservas();
      } else {
        alert("No se pudo eliminar la reserva del servidor.");
      }
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      alert("Error de conexión al intentar eliminar.");
    }
  };
  return (
    <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>Reservas Confirmadas</h3>
      
      {reservas.length === 0 ? (
        <p style={{ color: '#64748b', fontSize: '14px' }}>No hay reservas registradas en MySQL.</p>
      ) : (
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
              {/* Contenedor de botones (Editar y Cancelar) */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => onEditarReserva && onEditarReserva(reserva)}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(reserva.id)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
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