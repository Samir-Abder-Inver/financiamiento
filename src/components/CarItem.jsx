
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarItem.css';
import IncreaseModal from './IncreaseModal';
import { getPlansByCar } from '../api/cars'; // 1. Importamos la función de la API

const CarItem = ({ car }) => {
  const navigate = useNavigate();
  const [showIncreaseModal, setShowIncreaseModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 2. Estado de carga

  // 3. Convertimos la función a `async`
  const handleVerPlanes = async () => {
    if (car.status === 'increase') {
      setShowIncreaseModal(true);
    } else {
      setIsLoading(true); // Activamos el estado de carga
      try {
        // 4. Llamamos a la API con el nombre del auto
        const plansData = await getPlansByCar(car.name);
        
        // 5. Navegamos a la ruta /plans y pasamos los datos en el `state`
        navigate('/plans', { 
          state: { 
            plans: plansData, 
            carName: car.name 
          } 
        });
        
      } catch (error) {
        console.error("Error al obtener los planes:", error);
        // Aquí podrías mostrar una notificación de error al usuario
      } finally {
        setIsLoading(false); // Desactivamos el estado de carga
      }
    }
  };

  const handleCloseModal = () => {
    setShowIncreaseModal(false);
  };

  const handleUpdate = () => {
    // Lógica para manejar la actualización desde el modal
    setShowIncreaseModal(false);
  };

  return (
    <>
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
            <>
              <svg
                className="status-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.263 2.341c.683-1.156 2.79-1.156 3.474 0l8.608 14.51c.656 1.109-.15 2.52-1.442 2.52H3.107c-1.292 0-2.098-1.411-1.442-2.52l8.6-14.51zM12 14.25a.75.75 0 00.75-.75V9a.75.75 0 00-1.5 0v4.5a.75.75 0 00.75.75zm0 2.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              Para este vehiculo necesitas aumentar tu inicial
            </>
          )}
        </div>
        <div className="card-actions">
          {/* 6. Actualizamos el botón para mostrar el estado de carga */}
          <button className="action-button" onClick={handleVerPlanes} disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Ver planes'}
          </button>
          <a href={car.features_link} className="action-button">Características</a>
        </div>
      </div>
      {showIncreaseModal && (
        <IncreaseModal onClose={handleCloseModal} onUpdate={handleUpdate} />
      )}
    </>
  );
};

export default CarItem;
