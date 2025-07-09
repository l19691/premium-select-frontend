import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/auth/authSlice";

export function useAuth() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginUser = (userData) => dispatch(login(userData));
  const logoutUser = () => dispatch(logout());

  return { user, isAuthenticated, loginUser, logoutUser };
}
