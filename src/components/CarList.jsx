
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CarItem from './CarItem';
import CarSkeleton from './CarSkeleton';
import IncreaseModal from './IncreaseModal'; // Importamos el modal
import { getCars, getPlansByCar } from '../api/cars';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingCarId, setLoadingCarId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para controlar el modal
  const [isIncreaseModalOpen, setIncreaseModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const initialValue = location.state?.updatedInitial || 14600;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getCars(initialValue);
        setCars(data);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los autos. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [initialValue]);

  const handleUpdateInitial = (newInitial) => {
    setIncreaseModalOpen(false); // Cierra el modal
    navigate('/', { state: { updatedInitial: newInitial } }); // Recarga la página con el nuevo valor
  };

  const handleViewPlans = async (car) => {
    // Si el auto requiere aumentar la inicial, abrimos el modal
    if (car.status === 'increase') {
      setSelectedCar(car);
      setIncreaseModalOpen(true);
      return;
    }

    // Si el auto está disponible, vamos a los planes
    setLoadingCarId(car.name);
    try {
      const plansData = await getPlansByCar(car.name, initialValue);
      navigate('/plans', {
        state: {
          plans: plansData,
          carName: car.name,
        },
      });
    } catch (error) {
      console.error("Error al obtener los planes:", error);
    } finally {
      setLoadingCarId(null);
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="car-list">
      <div className="intro">
        <h2>¡Excelente noticia, [Nombre]!</h2>
        <p>Tu crédito fue preaprobado por [$$Monto]. Elige tu vehículo y revisa los planes que aplican para ti.</p>
      </div>
      <div className="initial-value-display">
        <span>Tu inicial es de: </span>
        <strong>${initialValue.toLocaleString('es-CL')}</strong>
      </div>
      <div className="car-grid">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => <CarSkeleton key={index} />)
        ) : (
          cars.map((car) => (
            <CarItem
              key={car.name}
              car={car}
              onViewPlans={() => handleViewPlans(car)}
              isLoading={loadingCarId === car.name}
            />
          ))
        )}
      </div>

      {/* Renderizamos el modal cuando sea necesario */}
      {isIncreaseModalOpen && (
        <IncreaseModal
          isOpen={isIncreaseModalOpen}
          onClose={() => setIncreaseModalOpen(false)}
          onUpdate={handleUpdateInitial}
          plan={selectedCar} // Pasamos la información del auto/plan
        />
      )}
    </div>
  );
};

export default CarList;
