import iconDelete from "../images/icon-delete.png";
import btnLike from "../images/btn-like.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext } from "react";

function Card({
  name,
  link,
  likes,
  onCardClick,
  owner,
  onCardLike,
  onCardDelete,
}) {
  const handleClick = () => {
    onCardClick({ name, link });
  };

  const handleCardLike = () => {
    onCardLike();
  };

  const handlePopupConfirmation = () => {
    onCardDelete();
  };

  const currentUser = useContext(CurrentUserContext);

  const isOwner = owner._id === currentUser?._id;

  const isLike =
    Array.isArray(likes) && likes.some((i) => i._id === currentUser?._id);

  const cardDeleteBtnClassName = `${
    isOwner ? "card-elements__container-btn-delete" : "inactive"
  }`;

  const cardLikeBtnClassName = `card-elements__container-footing-btn ${
    isLike
      ? "card-elements__container-footing-btn_active"
      : "card-elements__container-footing-btn_inactive"
  }`;

  return (
    <div className="card-elements__container">
      <button
        className={cardDeleteBtnClassName}
        onClick={handlePopupConfirmation}
      >
        <img
          className="card-elements__container-icon-delete"
          src={iconDelete}
          alt="icon eliminar imágen"
        />
      </button>
      <img
        className="card-elements__container-image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="card-elements__container-footing">
        <h3 className="card-elements__container-footing-title"> {name} </h3>
        <img
          className={cardLikeBtnClassName}
          src={btnLike}
          alt="like inactivo"
          onClick={handleCardLike}
        />
        {likes.length !== 0 && (
          <>
            <span className="card-elements__like-counter">{likes.length}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
