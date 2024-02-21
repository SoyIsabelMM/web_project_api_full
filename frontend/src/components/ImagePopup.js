import React from "react";
import closeIcon from "../images/close-icon.png";

function ImagePopup({ selectedCard, onClose }) {
  return (
    <section className={`modal ${selectedCard ? "" : "open"}`}>
      <div onClick={onClose} className="modal__overlay"></div>
      <div className="modal__container">
        <img
          className="modal__container-close"
          src={closeIcon}
          alt="icon para cerra la
            imágen"
          onClick={onClose}
        />

        {selectedCard && (
          <>
            <img
              className="modal__image-card"
              src={selectedCard.link}
              alt={selectedCard.name}
              id="modal"
            />
            <h3 className="modal__title-text"> {selectedCard.name} </h3>
          </>
        )}
      </div>
    </section>
  );
}

export default ImagePopup;
