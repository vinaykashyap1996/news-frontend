export const isAuthenticate = () => {
  if (typeof window == "undefined") return false;

  if (sessionStorage.getItem("userID")) {
    return sessionStorage.getItem("userID");
  } else {
    return false;
  }
};

export const signout = next => {
  if (typeof window !== "undefined") sessionStorage.removeItem("userID");
  next();
};
