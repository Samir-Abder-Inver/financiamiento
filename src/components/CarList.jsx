
import React, { useState, useEffect } from 'react';
import CarItem from './CarItem';
import { getCars } from '../api/cars'; // Importamos la nueva función
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialValue = 30000; // Fijo como solicitado

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getCars(initialValue);
        setCars(data);
        setError(null); // Limpiamos cualquier error previo
      } catch (err) {
        setError('No se pudieron cargar los autos. Inténtalo de nuevo más tarde.');
        console.error(err); // Mantenemos el log del error original
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p>Cargando autos...</p>; // O un componente de spinner
  }

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
        {cars.map((car, index) => (
          <CarItem key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarList;
