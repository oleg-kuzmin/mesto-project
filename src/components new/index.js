import '../pages/index.css';
import { getProfile } from './api.js';
import { openModal } from './modal.js';
import { enableValidation } from './validate.js';
import { page, profileTitle, profileSubtitle, profileAvatar, profileName, profileAboutSelf } from './variables.js';

enableValidation();

const showPage = () => {
  page.classList.remove('page_disabled');
}

getProfile().then((res) => {
  profileTitle.textContent = res.name;
  profileSubtitle.textContent = res.about;
  profileName.value = res.name;
  profileAboutSelf.value = res.about;
  profileAvatar.src = res.avatar;
  showPage();
});
