import React from 'react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">Cancelar</button>
          <button onClick={onConfirm} className="confirm-delete-button">Confirmar</button>
        </div>
      </div>
    </div>
  );
}