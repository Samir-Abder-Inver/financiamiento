
import React from 'react';
import { plans } from '../data/plans';
import PlanItem from './PlanItem';
import './Plans.css';

const Plans = () => {
  return (
    <div className="plans">
      <div className="plans-header">
        <h2>Planes disponibles - [Vehículo]</h2>
      </div>
      {plans.map((plan, index) => (
        <PlanItem key={index} plan={plan} />
      ))}
    </div>
  );
};

export default Plans;
