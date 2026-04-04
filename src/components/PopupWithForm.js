import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
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
      // Aqui dentro você vai colocar o que deve acontecer quando o formulário for enviado
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
    const submitButton = this._popup.querySelector(".popup__button");
    if (isLoading) {
      submitButton.textContent = loadingText;
    } else {
      submitButton.textContent = "Salvar"; // ou o texto original do botão
    }
  }

  reset() {
    this._form.reset(); // reseta o formulário
  }
}
