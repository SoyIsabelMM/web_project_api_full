import Profile from "./Profile";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <Profile
        userName={currentUser && currentUser.name}
        userAbout={currentUser && currentUser.about}
        userAvatar={currentUser && currentUser.avatar}
        onEditAvatarClick={onEditAvatarClick}
        onEditProfileClick={onEditProfileClick}
        onAddPlaceClick={onAddPlaceClick}
      />

      <section className="card-elements">
        {/* Here we will show all our cards  */}
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes}
              onCardClick={() => onCardClick(card)}
              onCardLike={() => onCardLike(card)}
              onCardDelete={() => onCardDelete(card)}
              owner={card.owner}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
