import React from 'react';
import './AlertModal.css';

const AlertModal = ({ isOpen, onClose, message, title = 'Atención' }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="alert-modal-overlay" onClick={onClose}>
            <div className="alert-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="alert-modal-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <h3 className="alert-modal-title">{title}</h3>
                <p className="alert-modal-message">{message}</p>
                <button className="alert-modal-button" onClick={onClose}>
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default AlertModal;
