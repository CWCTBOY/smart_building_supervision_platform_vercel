const AUTH_TOKEN = localStorage.getItem("access_token");

const signOut = () => {
  return null;
};

const tokenChecker = () => (AUTH_TOKEN ? true : false);
export { signOut, tokenChecker };
