const storageKeyToken = "readifyUserKey";
const storageKeyDarkMode = "readifyDarkMode";

const saveUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(storageKeyToken, JSON.stringify(user));
  }
};

const loadUser = () => {
  if (typeof window !== "undefined") {
    JSON.parse(localStorage.getItem(storageKeyToken));
  }
};

const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(storageKeyToken);
  }
};

const saveDarkMode = (boolean) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(storageKeyDarkMode, boolean);
  }
};

const loadDarkMode = () => {
  if (typeof window !== "undefined") {
    localStorage.getItem(storageKeyDarkMode);
  }
};

const storage = {
  saveUser,
  loadUser,
  logoutUser,
  saveDarkMode,
  loadDarkMode,
};

export default storage;
