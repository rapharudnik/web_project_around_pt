const showInputError = (formElement, inputElement, errorMessage, config) => {
  // Encontra o elemento de erro usando o ID do input
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (errorElement) {
    // Adiciona a classe de erro ao input
    inputElement.classList.add(config.inputErrorClass);
    // Define a mensagem de erro e torna o elemento visível
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);

    const field = inputElement.closest(".popup__field");
    const line = field.querySelector(".popup__line");

    if (line) {
      line.classList.add("popup__line_error");
    }
  }
};

//faz o oposto da função showImputError
const hideInputError = (formElement, inputElement, config) => {
  console.log("Procurando por:", `#${inputElement.id}-error`);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log("Elemento encontrado:", errorElement);

  //remove as classes de erro do imput e elemento de erro
  if (errorElement) {
    errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
  }

  //remove a mensagem de erro
  errorElement.textContent = "";

  const field = inputElement.closest(".popup__field");
  const line = field.querySelector(".popup__line");

  if (line) {
    line.classList.remove("popup__line_error");
  }
};

//verifica se o campo é válido e decide qual das outras duas chamar
const isValid = (formElement, inputElement, config) => {
  console.log(
    "isValid chamada para:",
    inputElement.id,
    "Válido:",
    inputElement.validity.valid
  );

  //verificando se os campos estão preenchidos corretamente
  if (!inputElement.validity.valid) {
    console.log("entrou no if");
    // Se o campo NÃO for válido, mostra o erro
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    // Se for válido, esconde o erro
    hideInputError(formElement, inputElement, config);
  }
};

//responsável por conectar todos os eventos aos elementos do formulário.
const setEventListeners = (formElement, config) => {
  console.log("setEventListeners chamada para:", formElement);

  // Busca todos os campos de entrada do formulário
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  //funcao para desabilitar botoes quando popup estiver invalido
  // 2. Para cada formulário, configurar a validação
  // Aqui vamos implementar a lógica para cada formulário
  // Para encontrar TODOS os inputs de UM formulário específico:

  //encontra o botão DESTE formulário
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  function toggleButtonState(formElement, buttonElement) {
    if (formElement.checkValidity()) {
      console.log("botao habilitado", buttonElement);
      // Formulário válido - HABILITAR botão
      buttonElement.disabled = false; // Funcionalidade
      buttonElement.classList.remove("popup__button_disabled"); // Visual
    } else {
      console.log("botao desabilitado", buttonElement);
      // Formulário inválido - DESABILITAR botão
      buttonElement.disabled = true; // Funcionalidade
      buttonElement.classList.add("popup__button_disabled"); // Visual
    }
  }

  //percorre todos os inputs dos popups
  inputList.forEach((inputElement) => {
    console.log("Formulário encontrado:", formElement); // Adicione esta linha
    // Aqui você adiciona o event listener
    toggleButtonState(formElement, buttonElement);
    inputElement.addEventListener("input", () => {
      // chamar funcao para verificar se o botao esta habilitado ou nao
      toggleButtonState(formElement, buttonElement);
    });
  });
  // Para cada campo, adiciona um event listener
  inputList.forEach((inputElement) => {
    isValid(formElement, inputElement, config);
    inputElement.addEventListener("input", function () {
      // Chama a função isValid() sempre que o usuário digitar algo
      isValid(formElement, inputElement, config);
    });
  });
};

//é como o maestro de uma orquestra - ela organiza e coordena todas as outras funções de validação que criamos.
const enableValidation = (config) => {
  // 1. Busca todos os formulários na página
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // 2. Para cada formulário, configura a validação
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
