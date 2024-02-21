import React from "react";
import iconEdit from "../images/icon-edit.png";
import addBtn from "../images/add-btn.png";

function Profile({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  userName,
  userAbout,
  userAvatar,
}) {
  return (
    <section className="profile">
      <img
        src={`${userAvatar}`}
        alt="Foto de Perfil"
        className="profile__image"
      />

      <div className="profile__overlay-edit">
        <img
          className="profile__btn-edit-photo"
          src={iconEdit}
          alt="Botón para editar
            foto del perfil"
          onClick={onEditAvatarClick}
        />
      </div>
      <div className="profile__info">
        <button className="profile__info-edit-btn" onClick={onEditProfileClick}>
          <img
            className="profile__info-icon-edit"
            src={iconEdit}
            alt="Botón editar perfil"
          />
        </button>
        <h1 className="profile__info-name"> {userName} </h1>
        <h2 className="profile__info-about"> {userAbout} </h2>
      </div>

      <button className="profile__add-btn" onClick={onAddPlaceClick}>
        <img
          className="profile__add-btn-image"
          src={addBtn}
          alt="Botón para agregar
            imagenes"
        />
      </button>
    </section>
  );
}

export default Profile;
