
import React, { useState } from 'react';
import './IncreaseModal.css';

const IncreaseModal = ({ isOpen, onClose, onUpdate, plan }) => {
  const [newInitial, setNewInitial] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleUpdateClick = () => {
    // La validación se hace con el estado del botón, pero mantenemos esto como seguridad
    if (newInitial && !isNaN(newInitial)) {
      onUpdate(Number(newInitial));
    }
  };

  // El botón estará deshabilitado si el input está vacío o no es un número válido
  const isInvalid = !newInitial || isNaN(newInitial) || Number(newInitial) <= 0;

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
          <input
            type="number"
            id="increase-amount"
            className="numeric-input"
            value={newInitial}
            onChange={(e) => setNewInitial(e.target.value)}
            placeholder="Ingresa un monto mayor a 0"
          />
        </div>
        <div className="modal-actions">
          <button
            className="btn btn-update"
            onClick={handleUpdateClick}
            disabled={isInvalid} // Añadimos el estado disabled
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
