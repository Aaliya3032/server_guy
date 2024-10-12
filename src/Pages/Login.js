import { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "email@gmail.com" && password === "Password1234*") {
      const user = { email, password };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(login({ user }));
      navigate("/home", { replace: false });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ marginTop: "140px" }}
    >
      <div className="mx-auto w-full max-w-lg bg-[#f6f6ef] rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-[#ff742b] text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <form onSubmit={handleLogin} className="mt-8">
          <div className="space-y-5 flex flex-col">
            <input
              className="border border-gray-300 rounded-lg p-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="border border-gray-300 rounded-lg p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="w-full text-white bg-gradient-to-br from-purple-600 to-[#ff742b] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
