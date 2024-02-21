import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import Input from "./Input.js";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  const handlePlaceNameChange = (evt) => {
    setPlaceName(evt.target.value);
  };

  const handlePlaceLinkChange = (evt) => {
    setPlaceLink(evt.target.value);
  };

  const handleCleanInputOnClose = () => {
    onClose();
    setPlaceLink("");
    setPlaceName("");
  };

  const handleSubmit = () => {
    if (!placeName || !placeLink) {
      alert("Campo requerido");
      return;
    }

    const imageRegex = /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/i;

    if (!imageRegex.test(placeLink)) {
      alert("La URL no es una URL de imagen válida");
      return;
    }

    onAddPlaceSubmit({
      name: placeName,
      link: placeLink,
    }).then(() => {
      setPlaceName("");
      setPlaceLink("");
      onClose();
    });
  };
  return (
    <PopupWithForm
      title={"Nuevo Lugar"}
      className="popup"
      id="add-picture-form"
      nameBtn="Guardar"
      isOpen={isOpen}
      onClose={handleCleanInputOnClose}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        className="popup__container-input"
        placeholder="Título"
        id="title-place"
        maxLength="30"
        value={placeName}
        onChange={handlePlaceNameChange}
      >
        <span className="popup__input-error title-place-error"></span>
      </Input>

      <Input
        type="url"
        className="popup__container-input"
        placeholder="Enlace a la imagen"
        id="new-image"
        value={placeLink}
        onChange={handlePlaceLinkChange}
      >
        <span className="popup__input-error name-error"></span>
      </Input>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
