export default class UserInfo {
  constructor(userInfo) {
    // Recebe os seletores e encontra os elementos DOM
    this._nameElement = document.querySelector(userInfo.nameSelector);
    this._jobElement = document.querySelector(userInfo.jobSelector);
    this._avatarElement = document.querySelector(userInfo.avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(newUserInfo) {
    this._nameElement.textContent = newUserInfo.name;
    this._jobElement.textContent = newUserInfo.job;
  }

  // Novo método para atualizar o avatar
  setUserAvatar(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }
}
