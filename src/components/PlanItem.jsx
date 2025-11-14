
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import './PlanItem.css';

const PlanItem = ({ plan }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="plan-item">
        <h4>{plan.name}</h4>
        <div className="plan-details">
          <div>
            <span>Inicial</span>
            <strong>{plan.initial}</strong>
          </div>
          <div>
            <span>Cuotas (x12)</span>
            <strong>{plan.cuotas}</strong>
          </div>
        </div>
        <div className="plan-actions">
          <button onClick={handleOpenModal}>Elegir este plan</button>
          <button onClick={handleGoBack}>Cambiar vehículo</button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        planName={plan.name}
      />
    </>
  );
};

export default PlanItem;
