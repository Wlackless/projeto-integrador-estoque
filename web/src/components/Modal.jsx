import React from 'react';


export default function Modal({ isOpen, onClose, title, message, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{ marginBottom: '10px' }}>{title}</h3>
        <p style={{ color: '#a8a8b3' }}>{message}</p>
        
        <div className="modal-actions">
          {onConfirm ? (
            <>
              <button className="secondary" onClick={onClose}>Cancelar</button>
              <button className="danger" onClick={() => { onConfirm(); onClose(); }}>Confirmar</button>
            </>
          ) : (
            <button onClick={onClose}>Fechar</button>
          )}
        </div>
      </div>
    </div>
  );
}