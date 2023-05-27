import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
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
  const [renderUserUpdateLoading, setRenderUserUpdateLoading] = useState(false);
  const [renderAvatarUpdateLoading, setRenderAvatarUpdateLoading] =
    useState(false);
  const [renderAddPlaceLoading, setRenderAddPlaceLoading] = useState(false);
  const [renderCardDeleteLoading, setRenderCardDeleteLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
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
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  useEffect(() => {
    handleTokenCheck();
  }, []);

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

  const handleLogin = (email, password) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => alert(err));
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserDetails(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setСurrentUser(userInfo);
          setCards(cards);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmCardDelete(card) {
    setSelectedCard(card);
    setIsConfirmCardDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
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
    setRenderUserUpdateLoading(true);
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
        setRenderUserUpdateLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setRenderAvatarUpdateLoading(true);
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
        setRenderAvatarUpdateLoading(false);
      });
  }

  function handleAddPlace(data) {
    setRenderAddPlaceLoading(true);
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
        setRenderAddPlaceLoading(false);
      });
  }

  function handleCardDelete(card) {
    setRenderCardDeleteLoading(true);
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
        setRenderCardDeleteLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
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
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={
                  <>
                    <Header
                      loggedIn={loggedIn}
                      email={userEmail}
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
          isLoading={renderAvatarUpdateLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={renderUserUpdateLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={renderAddPlaceLoading}
        />
        <ConfirmCardDeletePopup
          isOpen={isConfirmCardDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={selectedCard}
          isLoading={renderCardDeleteLoading}
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
