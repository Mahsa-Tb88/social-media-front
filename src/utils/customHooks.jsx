import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useRedurectIfIsLoggedIn() {
  const user = useSelector((state) => state.user);
  console.log("user is", user);
  const navigate = useNavigate();
  useEffect(() => {
    navigate(user.isLoggedIn ? `/profile/${user.profile.id}` : "/login");
  }, [user.isLoggedIn]);

  return user.isLoggedIn;
}
