export default class UserInfo {
  constructor({ selectorUserName, selectorAboutSelf, selectorAvatar }) {
    this._name = document.querySelector(selectorUserName);
    this._aboutSelf = document.querySelector(selectorAboutSelf);
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo(data) {
    this.userInfo = {};
    this.userInfo.name = data.name;
    this.userInfo.about = data.about;
    this._name.textContent = data.name;
    this._aboutSelf.textContent = data.about;
    return this.userInfo;
  }

  changeUserInfo(name, about) {
    this._name.textContent = name;
    this._aboutSelf.textContent = about;
  }

  changeUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
