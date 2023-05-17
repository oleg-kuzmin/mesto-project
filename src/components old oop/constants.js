export const profileName = document.querySelector('.profile__name'); // текст профиля (Имя) на сайте
export const profileContactInfo = document.querySelector('.profile__contact-info'); // текст профиля (О себе) на сайте
export const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка открытия редактирования профиля
export const profileEditForm = document.forms.profile_edit; // форма редактирования профиля
export const profileNameEdit = profileEditForm.elements.profile_name; // инпут формы редактирования профиля (Имя)
export const contactInfoEdit = profileEditForm.elements.contact_info; // инпут формы редактирования профиля (О себе)
export const changeProfileButton = profileEditForm.elements.change_profile; // кнопка submit формы редактирования профиля
export const profileAvatarButton = document.querySelector('.profile__avatar-button'); // кнопка открытия редактирования аватара
export const profileAvatarEditForm = document.forms.profile_avatar_edit; // форма редактирования аватара
export const changeAvatarButton = profileAvatarEditForm.elements.change_avatar; // кнопка submit формы редактирования аватара
export const profileAddButton = document.querySelector('.profile__add-button'); // кнопка открытия создания нового места
export const addCardForm = document.forms.add_card; // форма создания нового места
export const createCardButton = addCardForm.elements.create_card; // кнопка submit формы создания нового места

export const validationConfig = {
  inputSelector: '.popup__item', // селектор инпута формы
  submitButtonSelector: '.popup__button', // селектор кнопки submit формы
  inactiveButtonClass: 'popup__button_disabled', // класс выключения кнопки submit формы
  inputErrorClass: 'popup__item_error', // класс включения ошибки инпута формы
};
