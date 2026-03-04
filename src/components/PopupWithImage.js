import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(imageSrc, imageAlt) {
    console.log("imageSrc:", imageSrc);
    console.log("imageAlt:", imageAlt);
    const image = this._popup.querySelector(".popup__image");
    const caption = this._popup.querySelector(".popup__caption");

    image.src = imageSrc;
    image.alt = imageAlt;
    caption.textContent = imageAlt;

    super.open();
  }
}
