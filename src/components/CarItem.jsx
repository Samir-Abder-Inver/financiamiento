
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CarItem.css';

const CarItem = ({ car }) => {
  const navigate = useNavigate();

  const handleVerPlanes = () => {
    navigate('/plans');
  };

  return (
    <div className="car-item-card">
      <div className="card-content">
        <h3 className="car-name">{car.name}</h3>
        <div className="price-info">
          <div className="price-item">
            <span className="price-label">Inicial</span>
            <span className="price-value">{car.initial}</span>
          </div>
          <div className="price-item">
            <span className="price-label">Cuotas x12</span>
            <span className="price-value">{car.cuotas}</span>
          </div>
          <div className="price-item">
            <span className="price-label">Precio final</span>
            <span className="price-value">{car.precioFinal}</span>
          </div>
        </div>
        <div className="car-image-section">
          <img src={car.image} alt={car.name} className="car-image" />
        </div>
      </div>
      <div className={`status status-${car.status}`}>
        {car.status === 'available' ? (
          <>
            <svg
              className="status-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            El vehículo está dentro de capacidad
          </>
        ) : (
          'Para este vehiculo necesitas aumentar tu incial'
        )}
      </div>
      <div className="card-actions">
        <button className="action-button" onClick={handleVerPlanes}>
          Ver planes
        </button>
        <a href={car.features_link} className="action-button">Características</a>
      </div>
    </div>
  );
};

export default CarItem;
