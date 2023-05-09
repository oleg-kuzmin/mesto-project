import { loadingIsProcess, loadingIsEnd } from '../components/utils';
import { patchAvatar, patchProfile, addCardToServer } from '../components/api';
import {
  profileAvatar,
  inputAvatarUrl,
  inputProfileName,
  inputProfileAboutSelf,
  profileTitle,
  profileSubtitle,
  inputPlaceName,
  inputPlaceUrl,
} from '../components/variables';
import { closePopup } from '../components/modal';
import { prependCardToDom } from '../components/card';

const submitFormAvatar = evt => {
  evt.preventDefault();
  loadingIsProcess(evt);
  patchAvatar(inputAvatarUrl)
    .then(() => {
      profileAvatar.src = inputAvatarUrl.value;
      closePopup();
    })
    .catch(res => console.error(res))
    .finally(() => {
      setTimeout(loadingIsEnd, 300, evt);
    });
};

const submitFormProfile = evt => {
  evt.preventDefault();
  loadingIsProcess(evt);
  patchProfile(inputProfileName, inputProfileAboutSelf)
    .then(() => {
      profileTitle.textContent = inputProfileName.value;
      profileSubtitle.textContent = inputProfileAboutSelf.value;
      closePopup();
    })
    .catch(res => console.error(res))
    .finally(() => {
      setTimeout(loadingIsEnd, 300, evt);
    });
};

const submitFormPlace = evt => {
  evt.preventDefault();
  loadingIsProcess(evt);
  const newCard = {};
  newCard.name = inputPlaceName.value;
  newCard.link = inputPlaceUrl.value;
  addCardToServer(newCard)
    .then(res => {
      prependCardToDom(res);
      closePopup();
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setTimeout(loadingIsEnd, 300, evt);
    });
};

export { submitFormAvatar, submitFormProfile, submitFormPlace };
