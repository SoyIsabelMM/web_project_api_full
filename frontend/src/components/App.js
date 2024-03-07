import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup.js";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

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
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loggedIn, setLoggedIn] = useState(!!token);

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

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
      .then(() => {
        const updateUser = {
          ...currentUser,
          name: data.name,
          about: data.about,
        };

        setCurrentUser(updateUser);
        setIsEditProfilePopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = async (url) => {
    api
      .updateAvatar(url)
      .then(() => {
        const updateAvatar = {
          ...currentUser,
          avatar: url,
        };

        setCurrentUser(updateAvatar);
        setIsEditAvatarPopupOpen(true);
      })
      .catch((err) => {
        console.log("No se ha actualizado el perfil:", err);
      });
  };

  function handleCardLikeOrDisLike(card) {
    const isLike = card.likes?.some((i) => i === currentUser._id);

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

  const handleAddPlaceSubmit = async ({ name, link }) => {
    api
      .addNewCardToServer(name, link)
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

  /**Condicional para renderizado de cards */

  const renderCards = loggedIn ? (
    <Main
      onEditProfileClick={handleEditProfileClick}
      onAddPlaceClick={handleAddPlaceClick}
      onEditAvatarClick={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLikeOrDisLike}
      onCardDelete={handleOpenConfirmation}
      cards={cards}
    />
  ) : null;

  /** Funciones para manejo de autorización */

  useEffect(() => {
    const handleCheckToken = () => {
      if (localStorage.getItem("token")) {
        const jwt = localStorage.getItem("token");
        auth
          .checkToken(jwt)
          .then((res) => {
            if (res.email) {
              setEmail(res.email);
              setLoggedIn(true);
              navigate("/");
              setCurrentUser(res);

              api
                .getCards()
                .then(({ cards }) => {
                  setCards(cards);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.error("El token no es valido:");
              localStorage.removeItem("token");
              navigate("/signin");
            }
          })
          .catch((err) => {
            console.error("Error al verificar el token:", err);
          });
      }
    };
    handleCheckToken();
  }, [loggedIn, navigate]);

  const handleLogin = (token) => {
    setLoggedIn(true);
    setToken(token);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setEmail("");
    setLoggedIn(false);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} signOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>{renderCards}</ProtectedRoute>
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
