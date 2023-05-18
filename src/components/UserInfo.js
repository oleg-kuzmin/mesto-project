export default class UserInfo {
  constructor(objectUser) {
    this.userName = document.querySelector(`.${objectUser.selectorUserName}`);
    this.userProfession = document.querySelector(`.${objectUser.selectorUserProfession}`);
    this.userAvatar = document.querySelector(`.${objectUser.selectorUserAvatar}`);
  }

  getUserInfo(objectUser) {
    this.userName.textContent = objectUser.name;
    this.userProfession.textContent = objectUser.about;
    this.userAvatar.src = objectUser.avatar;
  }

  changeInputUserInfo(inputProfileName, inputProfileAboutSelf) {
    inputProfileName.value = this.userName.textContent;
    inputProfileAboutSelf.value = this.userProfession.textContent;
  }

  setUserInfo(profileName, profileAboutSelf) {
    this.userName.textContent = profileName;
    this.userProfession.textContent = profileAboutSelf;
  }

  setUserAvatar(profileAvatar) {
    this.userAvatar.src = profileAvatar;
  }
}
