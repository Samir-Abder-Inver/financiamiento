
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PlanItem from './PlanItem';
import ConfirmationModal from './ConfirmationModal';
import IncreaseModal from './IncreaseModal';
import './Plans.css';

const Plans = () => {
  const location = useLocation();
  const { plans = [], carName = 'Vehículo' } = location.state || {};

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isIncreaseModalOpen, setIncreaseModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const carVersions = useMemo(() => {
    const versions = new Set(plans.map(p => p.version));
    return Array.from(versions);
  }, [plans]);

  const [activeTab, setActiveTab] = useState(carVersions[0] || '');

  const versionAvailability = useMemo(() => {
    const availability = {};
    carVersions.forEach(version => {
      const plansForVersion = plans.filter(p => p.version === version);
      availability[version] = plansForVersion.some(p => p.status === 'available');
    });
    return availability;
  }, [carVersions, plans]);

  const displayedPlans = useMemo(() => {
    if (!activeTab) return [];
    return plans.filter(plan => plan.version === activeTab);
  }, [plans, activeTab]);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    if (plan.status === 'available') {
      setConfirmationModalOpen(true);
    } else if (plan.status === 'increase') {
      setIncreaseModalOpen(true);
    }
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
    setSelectedPlan(null);
  };

  const closeIncreaseModal = () => {
    setIncreaseModalOpen(false);
    setSelectedPlan(null);
  };

  if (carVersions.length === 0) {
    return (
      <div className="plans-container">
        <p>No se encontraron versiones de planes para {carName}.</p>
      </div>
    );
  }

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
        <h3>Planes disponibles - {carName}</h3>
      </div>

      <div className="plans-content-box">
        <h4 className="versions-title">Versiones</h4>
        <div className="versions-tabs">
          {carVersions.map((version) => (
            <button
              key={version}
              className={`tab-button ${activeTab === version ? 'active' : ''} ${versionAvailability[version] ? 'tab-green' : 'tab-yellow'}`}
              onClick={() => setActiveTab(version)}
            >
              {version}
            </button>
          ))}
        </div>

        <div className="plans-grid">
          {displayedPlans && displayedPlans.length > 0 ? (
            displayedPlans.map((plan, index) => (
              <PlanItem key={index} plan={plan} onChoosePlan={handleChoosePlan} />
            ))
          ) : (
            <p>No hay planes disponibles para esta versión.</p>
          )}
        </div>
      </div>

      {isConfirmationModalOpen && selectedPlan && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          plan={selectedPlan}
          carName={carName}
        />
      )}

      {isIncreaseModalOpen && selectedPlan && (
        <IncreaseModal
          isOpen={isIncreaseModalOpen}
          onClose={closeIncreaseModal}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default Plans;
