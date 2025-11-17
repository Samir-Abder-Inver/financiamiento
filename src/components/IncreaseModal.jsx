import React from 'react';
import './IncreaseModal.css';

const IncreaseModal = ({ onClose, onUpdate }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Aumentar Inicial</h2>
        <p>El vehículo seleccionado supera tu capacidad de endeudamiento. Para continuar, te recomendamos aumentar el monto de la inicial.</p>
        <div className="form-group">
          <label htmlFor="increase-amount">Monto a aumentar</label>
          <input type="number" id="increase-amount" placeholder="Ingrese el monto" />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={onUpdate}>Actualizar</button>
        </div>
      </div>
    </div>
  );
};

export default IncreaseModal;