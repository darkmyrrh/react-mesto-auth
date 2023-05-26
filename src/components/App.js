import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmCardDeletePopup from "./ConfirmCardDeletePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import InfoToolTip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmCardDeletePopupOpen, setIsConfirmCardDeletePopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [renderLoading, setRenderLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserData({ email: res.data.email });
            setLoggedIn(true);
            navigate("/cards", { replace: true });
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const handleLogin = () => {
    handleTokenCheck();
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        setInfoToolTipOpen(true);
        setRegistrationSuccessful(true);
        navigate("/signin", { replace: true });
      })
      .catch(() => {
        setInfoToolTipOpen(true);
        setRegistrationSuccessful(false);
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserDetails(currentUser)
        .then((data) => {
          setСurrentUser(data);
        })
        .catch((err) => {
          alert(err);
        });
      api
        .getInitialCards(cards)
        .then((card) => {
          setCards(card);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleConfirmCardDelete(card) {
    setSelectedCard(card);
    setIsConfirmCardDeletePopupOpen(!isConfirmCardDeletePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmCardDeletePopupOpen(false);
    setInfoToolTipOpen(false);
  }

  function handleUpdateUser(data) {
    setRenderLoading(true);
    api
      .changeUserDetails(data)
      .then((info) => {
        setСurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setRenderLoading(true);
    api
      .changeUserAvatar(avatar)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleAddPlace(data) {
    setRenderLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleCardDelete(card) {
    setRenderLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => {
            return item._id !== card._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/cards" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="*"
            element={
              <>
                <Header loggedIn={loggedIn}>
                  <Link className="header__link root__button" to="/signin">
                    Войти
                  </Link>
                </Header>
                <NotFound />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Header loggedIn={loggedIn}>
                  <Link className="header__link root__button" to="/signup">
                    Регистрация
                  </Link>
                </Header>
                <Login handleLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header loggedIn={loggedIn}>
                  <Link className="header__link root__button" to="/signin">
                    Войти
                  </Link>
                </Header>
                <Register onRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/cards"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={
                  <>
                    <Header
                      loggedIn={loggedIn}
                      email={userData.email}
                      onSignOut={handleSignOut}
                    />
                    <Main
                      cards={cards}
                      setCards={setCards}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onOpenImagePopup={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleConfirmCardDelete}
                    />
                  </>
                }
              />
            }
          />
        </Routes>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={renderLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={renderLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={renderLoading}
        />
        <ConfirmCardDeletePopup
          isOpen={isConfirmCardDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={selectedCard}
          isLoading={renderLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          isSuccessful={isRegistrationSuccessful}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
