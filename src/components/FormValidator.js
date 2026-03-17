export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector),
    );
    this._buttonElement = formElement.querySelector(
      config.submitButtonSelector,
    );
  }

  _showInputError = (errorMessage, inputElement) => {
    // Encontra o elemento de erro usando o ID do input
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`,
    );

    if (errorElement) {
      // Adiciona a classe de erro ao input
      inputElement.classList.add(this._config.inputErrorClass);
      // Define a mensagem de erro e torna o elemento visível
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);

      const field = inputElement.closest(".popup__field");
      const line = field.querySelector(".popup__line");

      if (line) {
        line.classList.add("popup__line_error");
      }
    }
  };

  //faz o oposto da função showImputError
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`,
    );

    //remove as classes de erro do imput e elemento de erro
    if (errorElement) {
      errorElement.classList.remove(this._config.errorClass);
      inputElement.classList.remove(this._config.inputErrorClass);
      //remove a mensagem de erro
      errorElement.textContent = "";
    }

    const field = inputElement.closest(".popup__field");
    const line = field.querySelector(".popup__line");

    if (line) {
      line.classList.remove("popup__line_error");
    }
  }

  //verifica se o campo é válido e decide qual das outras duas chamar
  _isValid = (inputElement) => {
    //verificando se os campos estão preenchidos corretamente
    if (!inputElement.validity.valid) {
      // Se o campo NÃO for válido, mostra o erro
      this._showInputError(inputElement.validationMessage, inputElement);
    } else {
      // Se for válido, esconde o erro
      this._hideInputError(inputElement);
    }
  };

  //funcao para desabilitar botoes quando popup estiver invalido
  // 2. Para cada formulário, configurar a validação
  // Aqui vamos implementar a lógica para cada formulário
  // Para encontrar TODOS os inputs de UM formulário específico:

  //encontra o botão DESTE formulário
  _toggleButtonState() {
    if (this._formElement.checkValidity()) {
      // Formulário válido - HABILITAR botão
      this._buttonElement.disabled = false; // Funcionalidade
      this._buttonElement.classList.remove("popup__button_disabled"); // Visual
    } else {
      // Formulário inválido - DESABILITAR botão
      this._buttonElement.disabled = true; // Funcionalidade
      this._buttonElement.classList.add("popup__button_disabled"); // Visual
    }
  }

  _setEventListeners() {
    //percorre todos os inputs dos popups
    this._inputList.forEach((inputElement) => {
      // Aqui você adiciona o event listener
      inputElement.addEventListener("input", () => {
        //validar input especifico
        this._isValid(inputElement);
        //atualizar estado de botao
        this._toggleButtonState();
      });
    });
  }

  //é como o maestro de uma orquestra - ela organiza e coordena todas as outras funções de validação que criamos.
  enableValidation() {
    this._setEventListeners();
  }
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//instância para cada formulário
// Selecionar cada formulário específico
const profileForm = document.querySelector(".popup__profile");
const newPlaceForm = document.querySelector(".popup__newplace");

// Criar uma instância para cada formulário
const profileValidator = new FormValidator(config, profileForm);
const newPlaceValidator = new FormValidator(config, newPlaceForm);

// Ativar a validação para cada formulário
profileValidator.enableValidation();
newPlaceValidator.enableValidation();
