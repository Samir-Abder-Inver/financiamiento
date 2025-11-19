import React from 'react';
import './PlanItem.css';

const PlanItem = ({ plan, onChoosePlan, onBack }) => {

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
        <button
          className={plan.status === 'available' ? 'btn-available' : 'btn-increase'}
          onClick={() => onChoosePlan(plan)}
        >
          Elegir este plan
        </button>
        <button onClick={onBack}>Cambiar vehículo</button>
      </div>
    </div>
  );
};

export default PlanItem;
