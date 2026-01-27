import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Selecionar os elementos principais
const editButton = document.querySelector(".profile__info-edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-icon");

// Função para abrir o popup
function openPopup() {
  popup.classList.add("popup_opened");
  addEscapeListener();
  nameInput.value = currentname;
  functionInput.value = currentfunction;
}

// Função para fechar o popup
function closePopup() {
  popup.classList.remove("popup_opened");
  removeEscapeListener();
}

// Quando clicar no botão editar, abre o popup
editButton.addEventListener("click", openPopup);

// Quando clicar no botão fechar, fecha o popup
closeButton.addEventListener("click", closePopup);

const profilename = document.querySelector(".profile__name");
const profilefunction = document.querySelector(".profile__info-function");

const currentname = profilename.textContent;
const currentfunction = profilefunction.textContent;

const nameInput = document.querySelector("#form__input-name");
const functionInput = document.querySelector("#form__input-function");

const formElement = document.querySelector(".popup");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#form__input-name");
  let functionInput = document.querySelector("#form__input-function");

  const newName = nameInput.value;
  const newFunction = functionInput.value;

  const profileName = document.querySelector(".profile__name");
  const profileFunction = document.querySelector(".profile__info-function");

  profileName.textContent = newName;
  profileFunction.textContent = newFunction;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// ✅ Selecionar onde os cartões ficam
const cardsContainer = document.querySelector(".elements");
console.log("cardsContainer:", cardsContainer);

//array initialCards com os dados dos 6 cartões
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://plus.unsplash.com/premium_photo-1690440799957-38f180ab63c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://images.unsplash.com/photo-1613182749475-09d63e8001ba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Criar instâncias da classe Card para cada cartão inicial
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

//adicionando um cartão personalizado

//criando constantes para os inputs (imagem e título)
const titleInput = document.querySelector("#form__input-title");
const imageInput = document.querySelector("#form__input-image");

// Selecionar o formulário de adicionar cartão
const addNewCardForm = document.querySelector(".popup__newplace");
const addCardForm = addNewCardForm.querySelector(".form__newplace"); // ← formulário dentro do popup

// Adicionar event listener
addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault(); // ← Impede o envio padrão do formulário

  // Pegar os valores dos inputs
  const newTitle = titleInput.value;
  const newImageUrl = imageInput.value;

  // Chamar a função para adicionar o cartão
  addNewCard(newTitle, newImageUrl);

  // Limpar o formulário
  addCardForm.reset();

  closePopupNewplace();
});

//Programe o botão "Curtir" para os cartões:

//selecionar o container pai
const containers = document.querySelector(".elements");

containers.addEventListener("click", function (evt) {
  // Verificar se o elemento clicado é um botão de curtir
  if (evt.target.classList.contains("element__like-button")) {
    // Aqui você implementa a lógica do curtir
    evt.target.classList.toggle("element__like-button_active");
  }
});

//programar para excluir um cartão

containers.addEventListener("click", (event) => {
  // 3. Aqui dentro você vai colocar a lógica para excluir o cartão
  if (event.target.classList.contains("element__trash-button")) {
    //remover cartão
    const card = event.target.closest(".element");
    card.remove();
  }
});

//abrindo popup de imagem

//função abrir popup
function openPopupImage(popup) {
  popup.classList.add("popup__image_opened");
  addEscapeListener();
}

// Função para fechar o popup
function closePopupImage(popup) {
  popup.classList.remove("popup__image_opened");
  removeEscapeListener();
}

// Selecionar o popup de imagem
const imagePopup = document.querySelector(".popup__image");
//seleciona imagem
const imageElement = document.querySelector(".popup__image-photo");
//seleciona imagem
const textElement = document.querySelector(".popup__image-text");
//seleciona botão de fechar
const closeImage = document.querySelector(".popup__close-icon_image");

const images = document.querySelectorAll(".element__image");

//função
images.forEach((image) => {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("element__image")) {
      //define a imagem
      imageElement.src = event.target.src;
      //define a texto
      textElement.textContent = event.target.alt;
      // Abrir o popup
      openPopupImage(imagePopup);
    }
  });
});

//adiciona um evento (clicar no X)
closeImage.addEventListener("click", function () {
  //fecha o popup
  closePopupImage(imagePopup);
});

//seleciona a sobreposicao do popup
const allPopups = document.querySelectorAll(
  ".popup, .popup__newplace, .popup__image"
);

// Selecionar os elementos principais (popup new place)
const addPlace = document.querySelector(".profile__add-button");
const popupNewplace = document.querySelector(".popup__newplace");
const closeButtonNewplace = document.querySelector(
  ".popup__close-icon_newplace"
);

//função abrir popup
function openPopupNewplace() {
  popupNewplace.classList.add("popup__newplace_opened");
  addEscapeListener();
}

// Função para fechar o popup
function closePopupNewplace() {
  popupNewplace.classList.remove("popup__newplace_opened");
  removeEscapeListener();
}

// Quando clicar no botão add, abre o popup
//
addPlace.addEventListener("click", openPopupNewplace);
{
  addEscapeListener();
}

// Quando clicar no botão fechar, fecha o popup
closeButtonNewplace.addEventListener("click", closePopupNewplace);
{
  removeEscapeListener();
}

allPopups.forEach((popupContainer) => {
  popupContainer.addEventListener("click", function (evt) {
    // Se o clique foi diretamente no container (não no conteúdo)
    if (evt.target === popupContainer) {
      // Percorrer todas as classes do elemento
      popupContainer.classList.forEach((className) => {
        // Verificar se a classe termina com "opened"
        if (className.endsWith("opened")) {
          // Remover essa classe
          popupContainer.classList.remove(className);
          return;
        }
      });
    }
  });
});

// Função para adicionar o listener
function addEscapeListener() {
  document.addEventListener("keydown", handleEscapeKey);
}

// Função para remover o listener
function removeEscapeListener() {
  document.removeEventListener("keydown", handleEscapeKey);
}

//fechat popups clicando em esc
function handleEscapeKey(evt) {
  // Como verificar se a tecla pressionada foi Esc?
  if (evt.key === "Escape") {
    // 1. Pegar todos os popups
    const allPopups = document.querySelectorAll(
      ".popup, .popup__newplace, .popup__image"
    );
    allPopups.forEach((popupContainer) => {
      popupContainer.classList.forEach((className) => {
        // Verificar se a classe termina com "opened"
        // 2. Para cada popup, verificar se tem classe "opened"
        if (className.endsWith("opened")) {
          // 3. Se tiver, remover essa classe
          popupContainer.classList.remove(className);
          return;
        }
      });
    });
  }
}
