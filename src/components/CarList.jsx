
import React from 'react';
import { cars } from '../data/cars';
import CarItem from './CarItem';
import './CarList.css';

const CarList = () => {
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
