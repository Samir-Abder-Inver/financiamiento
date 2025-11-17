
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, plan }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/success', { state: { plan } });
  };

  return (
    <div className="modal-backdrop">
      <div className="confirmation-modal-content">
        <div className="modal-header">
          <h3>¿Desea confirmar el [{plan.name}] y enviar esta información?</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
            <input type="text" placeholder="Pedro Perez" />
          </div>
          <div className="form-group form-group-inline with-icon">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon"><path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V17.625c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V6.375c0-1.036-.84-1.875-1.875-1.875H3.375zM9 6.75h6v1.5H9v-1.5zM6.75 9.75h10.5v1.5H6.75v-1.5zM6 12.75a.75.75 0 000 1.5h12a.75.75 0 000-1.5H6z" /></svg>
            <select>
              <option>V</option>
              <option>E</option>
            </select>
            <input type="text" placeholder="123456789" />
          </div>
          <div className="form-group with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon"><path fillRule="evenodd" d="M5.25 2.25A2.25 2.25 0 003 4.5v15A2.25 2.25 0 005.25 21.75h13.5A2.25 2.25 0 0021 19.5v-15A2.25 2.25 0 0018.75 2.25H5.25zM6 4.5a.75.75 0 01.75-.75h10.5a.75.75 0 01.75.75v1.5H6v-1.5zM6 9h12V7.5H6V9zm0 3.75h12v-1.5H6v1.5zm0 3.75h12v-1.5H6v1.5z" clipRule="evenodd" /></svg>
            <input type="date" placeholder="01/01/1990" />
          </div>
          <div className="form-group form-group-inline with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.279-.087.431l4.258 7.373c.077.152.25.18.431.087l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C6.55 22.5 1.5 17.45 1.5 10.5V4.5z" clipRule="evenodd" /></svg>
            <select>
              <option>+58</option>
            </select>
            <input type="text" placeholder="0414-1234567" />
          </div>
          <div className="form-group with-icon">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
            <input type="email" placeholder="pedro@gmail.com" />
          </div>
          <div className="form-group with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <select>
              <option>Carabobo</option>
            </select>
          </div>
          <div className="form-group with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <select>
              <option>Valencia</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="accept-button">Aceptar</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationModal;
