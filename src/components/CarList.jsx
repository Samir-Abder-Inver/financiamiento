
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarItem from './CarItem';
import CarSkeleton from './CarSkeleton';
import { getCars, getPlansByCar } from '../api/cars';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingCarId, setLoadingCarId] = useState(null);
  const initialValue = 14600; // Este es el valor que necesitamos pasar
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
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
  }, []);

  const handleViewPlans = async (car) => {
    if (car.status === 'increase') {
      return;
    }
    setLoadingCarId(car.name);
    try {
      // ¡Aquí pasamos el segundo valor!
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
      <div className="car-grid">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <CarSkeleton key={index} />
          ))
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
    </div>
  );
};

export default CarList;
