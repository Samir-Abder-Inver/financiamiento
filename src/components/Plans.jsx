
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PlanItem from './PlanItem';
import './Plans.css';

const Plans = () => {
  const location = useLocation();
  const { plans = [], carName = 'Vehículo' } = location.state || {};

  // 1. Definimos las versiones en un array. ¡Ahora puedes añadir las que quieras!
  const carVersions = ['Classic', 'Premium', 'Sport', 'Deluxe'];

  // 2. El estado activo se inicializa con la primera versión del array.
  const [activeTab, setActiveTab] = useState(carVersions[0]);

  const displayedPlans = plans;

  return (
    <div className="plans-container">
      <div className="plans-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="check-icon"
          display="none"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
        <h3>Versiones disponibles - {carName}</h3>
      </div>

      <div className="plans-content-box">
        <div className="versions-tabs">
          {/* 3. Usamos .map() para generar dinámicamente los botones */}
          {carVersions.map((version) => (
            <button
              key={version} // La key es importante para React
              className={`tab-button ${activeTab === version ? 'active' : ''}`}
              onClick={() => setActiveTab(version)}
            >
              {version} 
            </button>
          ))}
        </div>

        <div className="plans-grid">
          {displayedPlans && displayedPlans.length > 0 ? (
            displayedPlans.map((plan, index) => (
              <PlanItem key={index} plan={plan} />
            ))
          ) : (
            <p>No hay planes disponibles para esta versión.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plans;
