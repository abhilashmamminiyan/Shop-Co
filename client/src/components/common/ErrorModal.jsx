import React from 'react'; // Added React import for JSX

export default function ErrorModal({ show, onHide, title, message }) {
    if (!show) return null;

    return (
        <>
            <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold text-danger">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {title || 'Error'}
                            </h5>
                            <button type="button" className="btn-close" onClick={onHide}></button>
                        </div>
                        <div className="modal-body py-4">
                            <p className="mb-0">{message}</p>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-dark rounded-pill px-4" onClick={onHide}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
