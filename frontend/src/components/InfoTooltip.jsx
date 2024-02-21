import React from "react";
import closeIcon from "../images/close-icon.png";
import denied from "../images/denied.png";
import accepted from "../images/accepted.png";

function InfoTooltip({ onClose, error, open }) {
  return (
    <section className={`popup ${open && "open"}`} id="info">
      <div className="popup__overlay"></div>

      <button
        className="popup__container-close-popup popup__container-close-popup_position"
        onClick={onClose}
      >
        <img
          src={closeIcon}
          alt="botón
              para cerrar cuadro emergente"
          className="popup__container-close-icon"
        />
      </button>
      {error ? (
        <>
          <div className="denied">
            <img src={denied} alt="acceso denegado" />
            <h3 className="title title_justify">
              Uy, algo salió mal. Por favor, <br /> inténtalo de nuevo.
            </h3>
          </div>
        </>
      ) : (
        <>
          <div className="access">
            <img src={accepted} alt="acceso aprobado" />
            <h3 className="title title_justify">
              ¡Correcto! Ya estás <br /> registrado.
            </h3>
          </div>
        </>
      )}
    </section>
  );
}

export default InfoTooltip;
