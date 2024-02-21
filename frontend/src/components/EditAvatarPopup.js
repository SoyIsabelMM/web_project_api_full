import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import Input from "./Input.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");

  const handleChangeAvatar = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleCleanInputOnClose = () => {
    onClose();
    setAvatar("");
  };

  const handleSubmit = () => {
    if (!avatar) {
      alert("Campo requerido");
      return;
    }

    const imageRegex = /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/i;

    if (!imageRegex.test(avatar)) {
      alert("La URL no es una URL de imagen válida");
      return;
    }

    onUpdateAvatar(avatar).then(() => {
      setAvatar("");
      onClose();
    });
  };

  return (
    <>
      <PopupWithForm
        title={"Cambiar foto de perfil"}
        className="modal-window"
        id="change-profile"
        nameBtn="Guardar"
        isOpen={isOpen}
        onClose={handleCleanInputOnClose}
        onSubmit={handleSubmit}
        classNameModal="modal-window__change-image"
      >
        <Input
          type="url"
          className="modal-window__input-url-change"
          placeholder="Título"
          id="url-change"
          value={avatar}
          onChange={handleChangeAvatar}
        >
          <span className="url-change-error"></span>
        </Input>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
