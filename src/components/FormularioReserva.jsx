import { useState, useEffect } from "react";

const INITIAL_STATE = {
  cliente: '',
  servicio: 'Corte de pelo',
  fecha: '',
  hora: ''
};

export function FormularioReserva({ onReservaCreada, reservaAEditar, onCancelarEdicion }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  // 1. Obtenemos la fecha de hoy en formato YYYY-MM-DD
  const hoy = new Date().toLocaleDateString('en-CA'); // Devuelve exactamente YYYY-MM-DD en la zona horaria local

  // 1. Si cambia 'reservaAEditar', rellenamos o limpiamos el formulario
  useEffect(() => {
    if (reservaAEditar) {
      setFormData(reservaAEditar);
    } else {
      setFormData(INITIAL_STATE);
    }
  }, [reservaAEditar]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 2. Comprobamos si tiene ID para saber si es PUT (edición) o POST (crear nueva)
    const esEdicion = Boolean(formData.id);
    const url = esEdicion 
      ? `http://localhost:8080/api/reservas/${formData.id}`
      : 'http://localhost:8080/api/reservas';
    const metodo = esEdicion ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(esEdicion ? '¡Reserva actualizada con éxito!' : '¡Reserva confirmada!');
        setFormData(INITIAL_STATE);
      
      // Si estábamos editando, notificamos la cancelación/salida del modo edición
      if (esEdicion && onCancelarEdicion) {
        onCancelarEdicion();
      }

        // Notificamos a App.jsx para recargar la lista
        if (onReservaCreada) {
          onReservaCreada();
        }
      } else {
        console.error('Error en el servidor:', response.status);
        alert('Hubo un problema al guardar los datos.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
      {/* El título cambia según si estamos editando o creando */}
      <h2 style={{ marginTop: 0, color: '#0f172a' }}>
        {formData.id ? 'Editar Reserva' : 'Reservar Cita'}
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
            Nombre completo:
          </label>
          <input 
            type="text" 
            name="cliente" 
            value={formData.cliente} 
            onChange={handleChange} 
            required 
            placeholder="Ej. Carlos Pérez"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
            Servicio:
          </label>
          <select 
            name="servicio" 
            value={formData.servicio} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          >
            <option value="Corte de pelo">Corte de pelo</option>
            <option value="Arreglo de barba">Arreglo de barba</option>
            <option value="Servicio Completo">Servicio Completo</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
            Fecha:
          </label>
          <input 
            type="date" 
            name="fecha" 
            value={formData.fecha} 
            min={hoy} /* 2. AQUÍ BLOQUEAMOS FECHAS PASADAS */
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
            Hora:
          </label>
          <input 
            type="time" 
            name="hora" 
            value={formData.hora} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
          />
        </div>

        {/* Contenedor de botones */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button 
            type="submit" 
            style={{ 
              flex: 1, 
              padding: '12px', 
              backgroundColor: formData.id ? '#10b981' : '#2563eb', // Verde para editar, azul para crear
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: '600', 
              cursor: 'pointer' 
            }}
          >
            {formData.id ? 'Guardar Cambios' : 'Confirmar Reserva'}
          </button>

          {/* Si está en modo edición, mostramos el botón Cancelar */}
          {formData.id && (
            <button 
              type="button" 
              onClick={onCancelarEdicion}
              style={{ 
                padding: '12px', 
                backgroundColor: '#64748b', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                fontWeight: '600', 
                cursor: 'pointer' 
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}