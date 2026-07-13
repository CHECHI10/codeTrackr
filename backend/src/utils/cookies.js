const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
};

const setAuthCookie = (res, token) => {
  res.cookie("token", token, getCookieOptions());
};

const clearAuthCookie = (res) => {
  res.clearCookie("token", {
    ...getCookieOptions(),
    maxAge: undefined
  });
};

module.exports = {
  setAuthCookie,
  clearAuthCookie
};
