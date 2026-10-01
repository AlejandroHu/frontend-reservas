const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/reservas';

export const reservasService = {
  // GET: Obtener todas las reservas
  async getAll() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron obtener las reservas.`);
    }
    return await response.json();
  },

  // POST: Crear una nueva reserva
  async create(reserva) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo guardar la reserva.`);
    }
    return await response.json();
  },

  // PUT: Actualizar una reserva existente
  async update(id, reserva) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo actualizar la reserva.`);
    }
    return await response.json();
  },

  // DELETE: Eliminar una reserva
  async delete(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo eliminar la reserva.`);
    }
    return true;
  }
};