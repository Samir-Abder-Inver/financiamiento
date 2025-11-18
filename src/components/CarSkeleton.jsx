
import React from 'react';
import './CarSkeleton.css';

const CarSkeleton = () => {
  return (
    <div className="car-item-skeleton">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
        <div className="skeleton skeleton-text medium"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );
};

export default CarSkeleton;
