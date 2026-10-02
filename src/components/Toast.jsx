import { useEffect } from "react";

export function Toast({ mensaje, tipo = "exito", onClose }) {
  useEffect(() => {
    // Se oculta automáticamente a los 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const esExito = tipo === "exito";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        backgroundColor: esExito ? "#10b981" : "#ef4444",
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 1000,
        animation: "slideIn 0.3s ease"
      }}
    >
      <span>{esExito ? "✅" : "⚠️"}</span>
      <span>{mensaje}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          marginLeft: "8px",
          padding: 0
        }}
      >
        ✕
      </button>
    </div>
  );
}