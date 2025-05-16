export function redirectIfNotLoggedIn(userLogin, navigate) {
  if (!userLogin?.id) {
    navigate("/login");
    return true;
  }
  return false;
}
