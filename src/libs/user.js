class User {
  #tokenKey = 'tokenKey';
  #userIdKey = 'userId';
  #userNameKey = 'userName';
  #store = window.localStorage;
 
  getToken() {
    return this.#store.getItem(this.#tokenKey);
  }
  setToken(token) {
    this.#store.setItem(this.#tokenKey, token);
  }
  removeToken() {
    this.#store.removeItem(this.#tokenKey);
  }

  getUserName() {
    return this.#store.getItem(this.#userNameKey);
  }
  setUserName(userName) {
    this.#store.setItem(this.#userNameKey, userName);
  }
  removeUserName() {
    this.#store.removeItem(this.#userNameKey);
  }

  getUserId() {
    const id = this.#store.getItem(this.#userIdKey);
    return id ? Number(id) : null
  }
  setUserId(userId) {
    this.#store.setItem(this.#userIdKey, userId);
  }
  removeUserId() {
    this.#store.removeItem(this.#userIdKey);
  }

  clearUser() {
    this.removeToken();
    this.removeUserName();
    this.removeUserId();
  }
}

export default new User();
