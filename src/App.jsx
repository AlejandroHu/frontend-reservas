import { useState } from "react";

// 1. Estado inicial fuera del componente para reutilizarlo al limpiar
const INITIAL_STATE = {
  cliente: '',
  servicio: 'Corte de pelo',
  fecha: '',
  hora: ''
};

export default function App(){
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos capturados listos para enviar a Spring Boot:", formData);
    alert(`Reserva confirmada para ${formData.cliente} el ${formData.fecha} a las ${formData.hora}`);
    setFormData(INITIAL_STATE);
  };

return (
    <div style={{ maxWidth: '420px', margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
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
      <div style={{ marginTop: '20px', padding: '10px', background: '#f1f5f9', borderRadius: '6px' }}>
        <h4>Estado en tiempo real (formData):</h4>
        <p><strong>Cliente:</strong> {formData.cliente}</p>
  
        {/* O si quieres ver el objeto completo formateado: */}
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}