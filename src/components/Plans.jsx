
import React from 'react';
import { plans } from '../data/plans';
import PlanItem from './PlanItem';
import './Plans.css';

const Plans = () => {
  return (
    <div className="plans">
      <div className="plans-header">
        <h3>Planes disponibles - [Vehículo]</h3>
      </div>
      {plans.map((plan, index) => (
        <PlanItem key={index} plan={plan} />
      ))}
    </div>
  );
};

export default Plans;
