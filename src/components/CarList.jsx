import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CarItem from './CarItem';
import CarSkeleton from './CarSkeleton';
import { getCars, getPlansByCar } from '../api/cars';
import { parseCurrency } from '../utils/currency';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingCarId, setLoadingCarId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [initialValue, setInitialValue] = useState(
    location.state?.updatedInitial || 14610
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
  <p>Tu crédito fue preaprobado por ${(initialValue * 1.9).toLocaleString('es-CL')}. Elige tu vehículo y revisa los planes que aplican para ti.</p>
</div>
      <div className="car-grid">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => <CarSkeleton key={index} />)
        ) : (
          cars.map((car) => {
            // Calculamos el status localmente
            const carInitial = parseCurrency(car.initial);
            const isAvailable = initialValue >= carInitial;
            const calculatedStatus = isAvailable ? 'available' : 'increase';

            // Creamos un objeto car modificado con el nuevo status
            const carWithStatus = { ...car, status: calculatedStatus };

            return (
              <CarItem
                key={car.name}
                car={carWithStatus}
                // Si el auto está disponible, le pasamos handleViewPlans
                onViewPlans={() => handleViewPlans(carWithStatus)}
                // A TODOS los items les pasamos la función para actualizar la inicial
                onInitialUpdate={handleUpdateInitial}
                isLoading={loadingCarId === car.name}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default CarList;
