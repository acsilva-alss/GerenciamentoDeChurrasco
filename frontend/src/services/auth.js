export const TOKEN_KEY = '@trinca-Token';
export const NAME_USER = '@user-name';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserName = () => localStorage.getItem(NAME_USER);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const setName= nameUser =>{
  localStorage.setItem(NAME_USER, nameUser);
}
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_USER);
};