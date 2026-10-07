import { useState, useEffect } from "react";
import { reservasService } from "../services/reservasService";

const INITIAL_STATE = {
  cliente: '',
  servicio: 'Corte de pelo',
  fecha: '',
  hora: ''
};

// Helper para generar tramos de 15 minutos (09:00, 09:15, 09:30, ...)
const generarOpcionesHora = (horaInicio = 9, horaFin = 21) => {
  const opciones = [];
  for (let h = horaInicio; h < horaFin; h++) {
    for (let m = 0; m < 60; m += 15) {
      const horaStr = String(h).padStart(2, '0');
      const minStr = String(m).padStart(2, '0');
      opciones.push(`${horaStr}:${minStr}`);
    }
  }
  return opciones;
};

const HORAS_DISPONIBLES = generarOpcionesHora(9, 21);

export function FormularioReserva({ onReservaCreada, reservaAEditar, onCancelarEdicion, onNotificar }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const hoy = new Date().toLocaleDateString('en-CA');

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
    const esEdicion = Boolean(formData.id);
    setSubmitting(true);

    try {
      if (esEdicion) {
        await reservasService.update(formData.id, formData);
        onNotificar?.('¡Reserva actualizada con éxito!', 'exito');
      } else {
        await reservasService.create(formData);
        onNotificar?.('¡Reserva confirmada con éxito!', 'exito');
      }

      setFormData(INITIAL_STATE);

      if (esEdicion && onCancelarEdicion) {
        onCancelarEdicion();
      }

      if (onReservaCreada) {
        onReservaCreada();
      }
    } catch (error) {
      console.error(error);
      onNotificar?.('Hubo un problema al guardar los datos.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
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
            min={hoy}
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
            Hora:
          </label>
          <select 
            name="hora" 
            value={formData.hora} 
            onChange={handleChange} 
            required 
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '6px', 
              border: '1px solid #cbd5e1', 
              boxSizing: 'border-box',
              backgroundColor: '#3b3b3b', // Mismo fondo oscuro que las opciones
              color: '#ffffff'
            }}
          >
            <option value="" disabled style={{ color: '#94a3b8', backgroundColor: '#3b3b3b' }}>
              Selecciona una hora
            </option>
            {HORAS_DISPONIBLES.map((hora) => (
              <option key={hora} value={hora} style={{ color: '#ffffff', backgroundColor: '#3b3b3b' }}>
                {hora}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button 
            type="submit" 
            disabled={submitting}
            style={{ 
              flex: 1, 
              padding: '12px', 
              backgroundColor: formData.id ? '#10b981' : '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: '600', 
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1
            }}
          >
            {submitting ? 'Guardando...' : (formData.id ? 'Guardar Cambios' : 'Confirmar Reserva')}
          </button>

          {formData.id && (
            <button 
              type="button" 
              onClick={onCancelarEdicion}
              disabled={submitting}
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