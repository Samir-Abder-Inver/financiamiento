
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CarItem from './CarItem';
import CarSkeleton from './CarSkeleton';
// El modal ya no se usa aquí directamente
// import IncreaseModal from './IncreaseModal'; 
import { getCars, getPlansByCar } from '../api/cars';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingCarId, setLoadingCarId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [initialValue, setInitialValue] = useState(
    location.state?.updatedInitial || 14600
  );

  // Este efecto se dispara si volvemos de la página de planes con una inicial actualizada
  useEffect(() => {
    if (location.state?.updatedInitial && location.state.updatedInitial !== initialValue) {
      setInitialValue(location.state.updatedInitial);
    }
  }, [location.state?.updatedInitial, initialValue]);


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

  // Esta es la función que finalmente actualiza el estado y recarga los autos.
  // Se pasará a través de CarItem hasta el modal.
  const handleUpdateInitial = (newAmount) => {
    setInitialValue(newAmount);
  };

  // Esta función es para cuando el auto SÍ está disponible
  const handleViewPlans = async (car) => {
    setLoadingCarId(car.name);
    try {
      const plansData = await getPlansByCar(car.name, initialValue);
      navigate('/plans', {
        state: {
          plans: plansData,
          carName: car.name,
          updatedInitial: initialValue
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
              // Si el auto está disponible, le pasamos handleViewPlans
              onViewPlans={() => handleViewPlans(car)}
              // A TODOS los items les pasamos la función para actualizar la inicial
              onInitialUpdate={handleUpdateInitial}
              isLoading={loadingCarId === car.name}
            />
          ))
        )}
      </div>

      {/* El modal ya no se renderiza aquí */}
    </div>
  );
};

export default CarList;
