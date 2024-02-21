import { useEffect } from "react";
import closeIcon from "../images/close-icon.png";

function PopupWithForm({
  className,
  isOpen,
  onClose,
  classNameModal,
  id,
  children,
  title,
  nameBtn,
  onSubmit,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <section className={`${className} ${isOpen ? "open" : ""}`} id={id}>
      <div onClick={onClose} className="popup__overlay"></div>
      <div
        className={`${classNameModal ? classNameModal : "popup__container"}`}
      >
        <button className="popup__container-close-popup" onClick={onClose}>
          <img
            src={closeIcon}
            alt="botón
              para cerrar cuadro emergente"
            className="popup__container-close-icon"
          />
        </button>

        <h3 className="popup__container-text">{title}</h3>

        <form
          className="popup__container-form"
          noValidate
          onSubmit={handleSubmit}
        >
          {children}
          <button className="popup__container-save-btn" type="submit">
            {nameBtn}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
