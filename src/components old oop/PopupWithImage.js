import Popup from "./popup";

//открытие попапа с картинкой
export default class PopupWithImage extends Popup {
  constructor(popupId, headingPlaceImage, imageItem) {
    super(popupId);
    this._headingPlaceImage = this._popup.querySelector(headingPlaceImage);
    this._imageItem = this._popup.querySelector(imageItem);
  }

  open(name, link) {
    super.open();
    this._headingPlaceImage.textContent = name;
    this._imageItem.alt = name;
    this._imageItem.src = link;
  }
}
