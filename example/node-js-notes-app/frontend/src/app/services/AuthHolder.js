export const AuthHolder = {
  getToken: () => {
    if (localStorage.getItem("token") == null) {
      return JSON.parse(`{}`);
    }
    return JSON.parse(localStorage.getItem("token"));
  },
  setToken: (loginResponse) => {
    localStorage.setItem("token", JSON.stringify(loginResponse));
  },
};
