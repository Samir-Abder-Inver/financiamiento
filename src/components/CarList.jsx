
import React, { useState, useEffect } from 'react';
import CarItem from './CarItem';
import CarSkeleton from './CarSkeleton'; // Importamos el skeleton
import { getCars } from '../api/cars';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialValue = 30000;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Dejamos un tiempo mínimo de carga para que el skeleton sea visible
        // y la transición no sea tan brusca.
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
          // Mostramos 6 skeletons mientras carga
          Array.from({ length: 6 }).map((_, index) => (
            <CarSkeleton key={index} />
          ))
        ) : (
          cars.map((car, index) => (
            <CarItem key={index} car={car} />
          ))
        )}
      </div>
    </div>
  );
};

export default CarList;
