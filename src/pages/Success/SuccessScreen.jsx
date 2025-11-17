
import React from 'react';
import './SuccessScreen.css';
import { useLocation } from 'react-router-dom';

const SuccessScreen = () => {
  const location = useLocation();
  const { plan } = location.state || {};

  if (!plan) {
    return <div>No se ha seleccionado ningún plan.</div>;
  }

  return (
    <div className="success-screen">
      <main className="success-content">
        <h2>Usted seleccionó</h2>
        <div className="selected-plan">
          <div className="success-card-content">
            <div className="success-car-name">{plan.name}</div>
            <div className="success-price-info">
              <div className="success-price-item">
                <span className="success-price-label">Inicial</span>
                <strong className="success-price-value">${plan.initial}</strong>
              </div>
              <div className="success-price-item">
                <span className="success-price-label">Cuotas mensuales (x12)</span>
                <strong className="success-price-value">{plan.cuotas}</strong>
              </div>
              <div className="success-price-item">
                <span className="success-price-label">Precio final</span>
                <strong className="success-price-value">$12.888,53</strong>
              </div>
            </div>
            <div className="success-car-image-section">
              <img className="success-car-image" src="/assets/imagenes/Haval_H6.png" alt="Haval H6" />
            </div>
          </div>
        </div>

        <div className="success-message">
          <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="success-checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="success-checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
          <p>Su pre-aprobación finalizó.</p>
          <p>¡Su {plan.name.split(' ')[0]} está listo!</p>
        </div>

        <div className="next-steps">
          <p> ¡Felicidades! Su crédito está formalmente aprobado. Solo falta un paso esencial: seleccionar el color, firma de la documentación y pago de la inicial. Un asesor comercial te estará contactando.</p>
        </div>
      </main>
    </div>
  );
};

export default SuccessScreen;
