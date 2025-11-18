
import React from 'react';
import './IncreaseModal.css';

const IncreaseModal = ({ isOpen, onClose, onUpdate, plan }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="increase-modal-content">
        <h2>Actualiza la inicial</h2>
        <p>
          Para este vehículo necesitas aumentar tu inicial en [+$X] para aplicar
          al crédito, ingresa tus datos para recalcular
        </p>
        <div className="form-group">
          <label htmlFor="increase-amount">Inicial disponible</label>
          <input type="number" id="increase-amount" className="numeric-input" />
        </div>
        <div className="modal-actions">
          <button className="btn btn-update" onClick={onUpdate}>
            Actualizar
          </button>
          <button className="btn btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncreaseModal;
