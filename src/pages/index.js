import Card from "../../scripts/components/Card.js";
import Section from "../../scripts/components/Section.js";
import PopupWithImage from "../../scripts/components/PopupWithImage.js";
import PopupWithForm from "../../scripts/components/PopupWithForm.js";
import UserInfo from "../../scripts/components/UserInfo.js";
import Popup from "../scripts/components/Popup.js";
import FormValidator from "../../scripts/components/FormValidator.js";

// Criar instância do popup de imagem
const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

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

// Função para abrir popup de imagem
function handleCardClick(imageUrl, imageName) {
  popupWithImage.open(imageUrl, imageName);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements",
);

// Para renderizar os elementos iniciais
cardSection.renderItems();

// Selecionar os elementos principais
const editButton = document.querySelector(".profile__info-edit-button");
const addPlace = document.querySelector(".profile__add-button");

const nameInput = document.querySelector("#form__input-name");
const functionInput = document.querySelector("#form__input-function");

const userInfo = new UserInfo({
  nameSelector: document.querySelector(".profile__name"),
  jobSelector: document.querySelector(".profile__info-function"),
});

const popupProfile = new PopupWithForm(".popup__profile", (formData) => {
  userInfo.setUserInfo({
    name: formData["form__input-name"],
    job: formData["form__input-function"],
  });

  popupProfile.close();
});

popupProfile.setEventListeners();

editButton.addEventListener("click", () => {
  popupProfile.open();
});

const popupNewPlace = new PopupWithForm(".popup__newplace", (formData) => {
  const name = formData["form__input-title"];
  const link = formData["form__input-image"];
  const item = { name, link };
  console.log(item);
  const card = new Card(item, "#card-template", handleCardClick);
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
  popupNewPlace.close();
});

popupNewPlace.setEventListeners();

addPlace.addEventListener("click", () => {
  popupNewPlace.open();
});
