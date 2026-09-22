import { useState } from "react";

const INITIAL_STATE = {
  cliente: '',
  servicio: 'Corte de pelo',
  fecha: '',
  hora: ''
};

export function FormularioReserva({ onReservaCreada }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const mensaje = await response.text();
        console.log('Respuesta del servidor:', mensaje);
        alert(`¡Reserva confirmada! ${mensaje}`);

        setFormData(INITIAL_STATE);

        // Notificamos al componente padre (App.jsx) que se ha creado una reserva
        if (onReservaCreada) {
          onReservaCreada();
        }
      } else {
        console.error('Error en el servidor:', response.status);
        alert('Hubo un problema al guardar la reserva en el servidor.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('No se pudo conectar con el servidor. Revisa si Spring Boot está arrancado.');
    }
  };

  return (
    <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
      <h2 style={{ marginTop: 0, color: '#0f172a' }}>Reservar Cita</h2>
      
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

        <button 
          type="submit" 
          style={{ marginTop: '8px', padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
        >
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
}