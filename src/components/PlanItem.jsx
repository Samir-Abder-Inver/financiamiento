
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlanItem.css';

const PlanItem = ({ plan, onChoosePlan }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="plan-item">
      <h4>{plan.planName}</h4>
      <div className="plan-details">
        <div>
          <span>Inicial</span>
          <strong>{plan.initial}</strong>
        </div>
        <div>
          <span>Cuotas (x12)</span>
          <strong>{plan.monthlyPayment}</strong>
        </div>
      </div>
      <div className="plan-actions">
        <button onClick={() => onChoosePlan(plan)}>Elegir este plan</button>
        <button onClick={handleGoBack}>Cambiar vehículo</button>
      </div>
    </div>
  );
};

export default PlanItem;
