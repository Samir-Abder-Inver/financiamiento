
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlanItem.css';

const PlanItem = ({ plan }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="plan-item">
      <h4>{plan.name}</h4>
      <div className="plan-details">
        <div>
          <span>Inicial</span>
          <strong>{plan.initial}</strong>
        </div>
        <div>
          <span>Cuotas x12</span>
          <strong>{plan.cuotas}</strong>
        </div>
      </div>
      <div className="plan-actions">
        <button>Elegir este plan</button>
        <button onClick={handleGoBack}>Cambiar vehículo</button>
      </div>
    </div>
  );
};

export default PlanItem;
