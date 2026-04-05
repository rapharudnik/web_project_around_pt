import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__button"); // 👈 pega o botão
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    // Primeiro você pega todos os inputs
    const inputs = this._popup.querySelectorAll(".popup__input");
    const inputValues = {};

    // Depois você percorre cada um
    inputs.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _renderLoading(isLoading, loadingText = "Salvando...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText; // ou o texto original do botão
    }
  }

  reset() {
    this._form.reset(); // reseta o formulário
  }
}
