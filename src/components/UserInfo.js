export default class UserInfo {
  constructor(userInfo) {
    // Aqui você GUARDA os seletores que recebeu
    this._nameSelector = userInfo.nameSelector;
    this._jobSelector = userInfo.jobSelector;
  }

  getUserInfo() {
    return {
      name: document.querySelector(this._nameSelector).textContent,
      job: document.querySelector(this._jobSelector).textContent,
    };
  }

  setUserInfo(newUserInfo) {
    this._nameSelector.textContent = newUserInfo.name;
    this._jobSelector.textContent = newUserInfo.job;
  }
}
