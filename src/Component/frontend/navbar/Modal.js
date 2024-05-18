import React from 'react';

const Modal = ({ closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Modal Title</h2>
                <p>This is the modal content.</p>
            </div>
        </div>
    );
}

export default Modal;
