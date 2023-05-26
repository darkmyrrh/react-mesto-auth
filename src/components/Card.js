import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <h2 className="element__title">{card.name}</h2>
      <button
        type="button"
        aria-label="Нравится"
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
      ></button>
      <p className="element__likes">{card.likes.length}</p>
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="element__delete-button"
          onClick={handleDeleteClick}
        />
      )}
    </article>
  );
}

export default Card;
