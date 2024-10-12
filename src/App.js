import { Route, Routes, useNavigate} from "react-router-dom";
import Home from './Pages/Home'
import Login from './Pages/Login'
import UserDetails from './Pages/UserDetails'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { login } from "./Redux/authSlice";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      dispatch(login(savedUser));
    } else {
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
   <Routes>
    <Route path="/" element={isAuthenticated ? <Home/>  : <Login/> }/>
    <Route path="/home" element={isAuthenticated ? <Home/>  : <Login/> }/>
    <Route path="/user/:username" element={<UserDetails />} />
   </Routes>
  );
}

export default App;
