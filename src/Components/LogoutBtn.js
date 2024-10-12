import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex justify-end mr-4">
      <button className="bg-[#ff742b] hover:bg-orange-300 rounded-md p-1.5" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default LogoutBtn;
