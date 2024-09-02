import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
//   console.log(user?.userInfo?.role);

  useEffect(() => {
    if (user?.userInfo?.role !== "admin" && token) {
      toast.error("You are not an admin, logging out...");
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  }, [user, token, dispatch, navigate]);

  if (user?.userInfo?.role === "admin" && token) {
    return children;
  }
};

export default AdminProtectedRoute;
