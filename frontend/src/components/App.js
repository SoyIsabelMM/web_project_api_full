import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup.js";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import * as auth from "../utils/auth.js";

function App() {
  //** Manejo de estado de los Popups (abrir o cerrar) valor inicial: Cerrado "true"*/
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(true);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(true);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(true);

  //**Manejo de estado de la data del usuario */
  const [currentUser, setCurrentUser] = useState(null);

  //** constantes para inicio de estado de cada componente Card*/
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [confirmation, setConfirmation] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  //** Constantes para inicio de estado, manejo de autorización */
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api
      .getUserInfoFromServer()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log("Disculpa, se ha encontrado un error:", err);
      });

    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(false);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleOpenConfirmation = (card) => {
    setCardToDelete(card);
    setConfirmation(true);
  };

  const handleUpdateUser = async (data) => {
    api
      .saveDataToServer(data.name, data.about)
      .then((userData) => {
        const updateUser = {
          ...currentUser,
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
        };

        setCurrentUser(updateUser);
        setIsEditProfilePopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = async (data) => {
    api
      .updateAvatar(data)
      .then((avatarUrl) => {
        const updateAvatar = {
          ...currentUser,
          avatar: avatarUrl.avatar,
          name: avatarUrl.name,
          about: avatarUrl.about,
        };
        setCurrentUser(updateAvatar);
        setIsEditAvatarPopupOpen(true);
      })
      .catch((err) => {
        console.log("No se ha actualizado el perfil:", err);
      });
  };

  function handleCardLikeOrDisLike(card) {
    const isLike = card.likes.some((i) => i._id === currentUser._id);

    let apiRequest = isLike
      ? api.deleteLikeFromCard(card._id, isLike)
      : api.addLikeFromCard(card._id, !isLike);

    apiRequest.then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  async function handleCardDelete() {
    const isCard = cardToDelete._id;
    api.deleteCardFromServer(isCard).then(() => {
      setCards((prevCards) => prevCards.filter((c) => c._id !== isCard));
    });
  }

  const handleAddPlaceSubmit = async (newPlaceData) => {
    api
      .addNewCardToServer(newPlaceData.name, newPlaceData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(true);
      })
      .catch((err) => {
        console.log("Ha ocurrido un error al cargar la nueva imágen:", err);
      });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(true);
    setIsEditProfilePopupOpen(true);
    setIsAddPlacePopupOpen(true);

    setSelectedCard(false);
    setConfirmation(false);
    setCardToDelete(null);
  };

  /** Funciones para manejo de autorización */
  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
  };

  useEffect(() => {
    const handleCheckToken = () => {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");

        console.log(jwt);
        auth
          .checkToken(jwt)
          .then((res) => {
            if (res.data) {
              setEmail(res.data.email);
              setLoggedIn(true);
              navigate("/");
            } else {
              console.error("El token no es valido:");
            }
          })
          .catch((err) => {
            console.error("Error al verificar el token:", err);
          });
      }
    };
    handleCheckToken();
  }, [loggedIn, navigate]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} signOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLikeOrDisLike}
                  onCardDelete={handleOpenConfirmation}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={<Register title={"Regístrate"} nameBtn={"Regístrate"} />}
          />
          <Route
            path="/signin"
            element={
              <Login
                title={"Inicia sesión"}
                nameBtn={"Inicia sesión"}
                handleLogin={handleLogin}
              />
            }
          />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ConfirmationPopup
          onClose={closeAllPopups}
          isOpen={confirmation}
          onConfirm={handleCardDelete}
        />

        <ImagePopup onClose={closeAllPopups} selectedCard={selectedCard} />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
