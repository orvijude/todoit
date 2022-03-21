export const LOCAL_STROAGE = {
  get: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export const SESSION_STORAGE = {
  get: (key) => {
    return JSON.parse(sessionStorage.getItem(key));
  },
  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
};
