import React from 'react';

export default function Alert({ show, onHide, type = 'info', title, message }) {
    if (!show) return null;

    const typeConfig = {
        success: {
            bgColor: '#d4edda',
            borderColor: '#c3e6cb',
            textColor: '#155724',
            icon: 'bi-check-circle-fill',
            btnClass: 'btn-success'
        },
        error: {
            bgColor: '#f8d7da',
            borderColor: '#f5c6cb',
            textColor: '#721c24',
            icon: 'bi-exclamation-triangle-fill',
            btnClass: 'btn-danger'
        },
        info: {
            bgColor: '#d1ecf1',
            borderColor: '#bee5eb',
            textColor: '#0c5460',
            icon: 'bi-info-circle-fill',
            btnClass: 'btn-info'
        },
        warning: {
            bgColor: '#fff3cd',
            borderColor: '#ffeaa7',
            textColor: '#856404',
            icon: 'bi-exclamation-circle-fill',
            btnClass: 'btn-warning'
        }
    };

    const config = typeConfig[type] || typeConfig.info;

    return (
        <>
            <div 
                className={`modal fade ${show ? 'show d-block' : ''}`} 
                tabIndex="-1" 
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div 
                        className="modal-content border-0" 
                        style={{ borderLeft: `5px solid ${config.borderColor}` }}
                    >
                        <div 
                            className="modal-header border-0" 
                            style={{ backgroundColor: config.bgColor }}
                        >
                            <h5 
                                className="modal-title fw-bold" 
                                style={{ color: config.textColor }}
                            >
                                <i className={`bi ${config.icon} me-2`}></i>
                                {title || (type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Alert')}
                            </h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={onHide}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body py-4">
                            <p className="mb-0" style={{ color: config.textColor }}>
                                {message}
                            </p>
                        </div>
                        <div className="modal-footer border-0">
                            <button 
                                type="button" 
                                className={`btn ${config.btnClass} rounded-pill px-4`} 
                                onClick={onHide}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
