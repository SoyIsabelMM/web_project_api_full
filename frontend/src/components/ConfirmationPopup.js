import React from "react";
import closeIcon from "../images/close-icon.png";

function ConfirmationPopup({ isOpen, onClose, onConfirm }) {
  const handleDelete = (card) => {
    onConfirm(card);
    onClose();
  };

  return (
    <section className={` modal-window ${isOpen ? "" : "open"}`}>
      <div onClick={onClose} className="modal-window__overlay"></div>
      <div className="modal-window__container " id="say-yes">
        <img
          className="modal-window__btn-close"
          src={closeIcon}
          alt="icon para cerra la
            imágen"
          onClick={onClose}
        />
        <div className="modal-window__form-delete-card">
          <h3 className="modal-window__modal-title">¿Estás seguro?</h3>
          <button
            className="modal-window__btn-delete"
            type="submit"
            onClick={handleDelete}
          >
            Si
          </button>
        </div>
      </div>
    </section>
  );
}

export default ConfirmationPopup;
