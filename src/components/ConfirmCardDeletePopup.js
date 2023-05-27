import PopupWithForm from "./PopupWithForm.js";

function ConfirmCardDeletePopup({
  isOpen,
  onClose,
  onDeleteCard,
  card,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      buttonText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      card={card}
    />
  );
}

export default ConfirmCardDeletePopup;
