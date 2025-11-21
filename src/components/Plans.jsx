import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlanItem from './PlanItem';
import ConfirmationModal from './ConfirmationModal';
import IncreaseModal from './IncreaseModal';
import AlertModal from './AlertModal';
import { parseCurrency } from '../utils/currency';
import { isPlanAvailable } from '../utils/budgetConfig';
import './Plans.css';

const Plans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plans = [], carName = 'Vehículo', updatedInitial, carImage } = location.state || {};

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isIncreaseModalOpen, setIncreaseModalOpen] = useState(false);
  const [isAlertModalOpen, setAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Estado para la inicial actual, inicializado con lo que viene de la navegación
  const [currentInitial, setCurrentInitial] = useState(updatedInitial || 10000);

  // Derivamos los planes actualizando su status según la inicial actual y los umbrales hardcodeados
  const currentPlans = useMemo(() => {
    return plans.map(plan => {
      const planInitialValue = parseCurrency(plan.initial);

      // Usamos la lógica hardcodeada de presupuesto
      const isAvailable = isPlanAvailable(currentInitial, planInitialValue);

      return {
        ...plan,
        status: isAvailable ? 'available' : 'increase'
      };
    });
  }, [plans, currentInitial]);

  const carVersions = useMemo(() => {
    const versions = new Set(currentPlans.map(p => p.version));
    return Array.from(versions);
  }, [currentPlans]);

  const [activeTab, setActiveTab] = useState(carVersions[0] || '');

  const displayedPlans = useMemo(() => {
    if (!activeTab) return [];
    return currentPlans.filter(plan => plan.version === activeTab);
  }, [currentPlans, activeTab]);

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

  const handleUpdateInitial = (newInitial) => {
    // Actualizamos el estado local de la inicial
    setCurrentInitial(newInitial);

    // Limpiamos el valor del plan (que viene como "$ 5.000.000") para compararlo
    const planInitialValue = parseCurrency(selectedPlan.initial);

    // Usamos isPlanAvailable para verificar si el plan está disponible con el nuevo presupuesto
    if (isPlanAvailable(newInitial, planInitialValue)) {
      // Cerramos el modal de aumento pero NO limpiamos el plan seleccionado todavía
      setIncreaseModalOpen(false);

      // Damos un pequeño timeout para asegurar que el modal anterior se cierre visualmente
      // y luego abrimos el de confirmación
      setTimeout(() => {
        setConfirmationModalOpen(true);
      }, 100);
    } else {
      // Mostramos el modal de alerta personalizado en lugar del alert nativo
      setAlertMessage(`El monto ingresado es menor a la inicial requerida para este plan (${selectedPlan.initial})`);
      setIncreaseModalOpen(false);
      setAlertModalOpen(true);
    }
  };

  const handleBack = () => {
    // Navegamos hacia atrás pasando la inicial actualizada
    navigate('/', { state: { updatedInitial: currentInitial } });
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
              <PlanItem
                key={index}
                plan={plan}
                onChoosePlan={handleChoosePlan}
                onBack={handleBack}
              />
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
          carImage={carImage} // <-- Pasamos la imagen del auto aquí
        />
      )}

      {isIncreaseModalOpen && selectedPlan && (
        <IncreaseModal
          isOpen={isIncreaseModalOpen}
          onClose={closeIncreaseModal}
          onUpdate={handleUpdateInitial}
          plan={selectedPlan}
        />
      )}

      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        message={alertMessage}
        title="Presupuesto insuficiente"
      />
    </div>
  );
};

export default Plans;
