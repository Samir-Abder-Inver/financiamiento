
import React, { useState, useEffect } from 'react';
import CarItem from './CarItem';
import CarSkeleton from './CarSkeleton';
import { getCars, getPlansByCar } from '../api/cars'; // Importamos getPlansByCar
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null); // Para el auto seleccionado
  const [plans, setPlans] = useState([]); // Para guardar los planes
  const [loadingPlans, setLoadingPlans] = useState(false);
  const initialValue = 30000;

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

  // Función para manejar la obtención de planes
  const handleViewPlans = async (carName) => {
    // La función de la API espera un `carId`, pero en el mock funciona con el nombre.
    // En un caso real, usaríamos un ID único, ej: car.id
    console.log(`Buscando planes para: ${carName}`);
    setLoadingPlans(true);
    setSelectedCar(carName);
    try {
      const plansData = await getPlansByCar(carName);
      setPlans(plansData);
      console.log('Planes recibidos:', plansData);
      // Aquí es donde en el futuro abriremos el modal
    } catch (error) {
      console.error("Error al obtener los planes:", error);
    } finally {
      setLoadingPlans(false);
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
              key={car.carName} // Usamos una key única como el nombre del auto
              car={car} 
              onViewPlans={handleViewPlans} // Pasamos la función al componente hijo
            />
          ))
        )}
      </div>
      {/* Aquí podríamos mostrar un modal con los planes si `selectedCar` no es null */}
    </div>
  );
};

export default CarList;
