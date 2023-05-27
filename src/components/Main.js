import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onOpenImagePopup,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cardsElements = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onOpenImagePopup}
      onCardDelete={onCardDelete}
      onCardLike={onCardLike}
    />
  ));

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          aria-label="Изменить"
          className="profile__edit-button"
          onClick={onEditAvatar}
        >
          <img
            src={`${currentUser.avatar}`}
            alt="Фото пользователя"
            className="profile__avatar"
          />
          <div className="profile__edit-image"></div>
        </button>
        <div className="profile-info">
          <h1 className="profile-info__name">{`${currentUser.name}`}</h1>
          <button
            type="button"
            aria-label="Редактировать"
            className="profile-info__edit-button root__button"
            onClick={onEditProfile}
          ></button>
          <p className="profile-info__description">{`${currentUser.about}`}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__add-button root__button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="photo-grid">
        <ul className="elements">
          {cardsElements}
        </ul>
      </section>
    </main>
  );
}

export default Main;
