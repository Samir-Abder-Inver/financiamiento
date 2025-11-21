
import React, { useState } from 'react';
import './IncreaseModal.css';

const IncreaseModal = ({ isOpen, onClose, onUpdate, plan }) => {
  const [newInitial, setNewInitial] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleUpdateClick = () => {
    // The validation is done with the button's state, but we keep this as a safeguard
    if (newInitial && !isNaN(newInitial)) {
      onUpdate(Number(newInitial));
    }
  };

  // The button will be disabled if the input is empty or not a valid number
  const isInvalid = !newInitial || isNaN(newInitial) || Number(newInitial) <= 0;

  const options = [
    { value: '', label: 'Seleccione' },
    { value: '10000', label: 'Menor a $15,000' },
    { value: '15000', label: 'Desde $15,000 hasta $20,000' },
    { value: '20000', label: 'Desde $20,000 hasta $30,000' },
    { value: '30000', label: 'Mayor a $30,000' },
  ];

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
          <select
            id="increase-amount"
            className="numeric-input"
            value={newInitial}
            onChange={(e) => setNewInitial(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value} disabled={option.value === ''}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button
            className="btn btn-update"
            onClick={handleUpdateClick}
            disabled={isInvalid}
          >
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
