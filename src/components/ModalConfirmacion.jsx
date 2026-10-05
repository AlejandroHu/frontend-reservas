export function ModalConfirmacion({ isOpen, titulo, mensaje, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '16px'
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0'
        }}
      >
        <h3 style={{ marginTop: 0, color: '#0f172a', fontSize: '18px' }}>
          {titulo || '¿Estás seguro?'}
        </h3>
        
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
          {mensaje}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#475569',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
          
          <button
            onClick={onConfirm}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}