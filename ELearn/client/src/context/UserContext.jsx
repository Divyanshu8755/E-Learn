import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { server } from "../main";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate,fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email, password });
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchMyCourse();//to resolve the bug of showing previous user course
    } catch (err) {
      setBtnLoading(false);
      setIsAuth(false);
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    }
  }

  // Register
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, { name, email, password });
      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (err) {
      setBtnLoading(false);
      const errorMessage = err.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setIsAuth(true);
      setUser(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, { otp, activationToken });
      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (err) {
      setBtnLoading(false);
      const errorMessage = err.response?.data?.message || "Verification failed";
      toast.error(errorMessage);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <UserContext.Provider value={{ user, setUser, setIsAuth, isAuth, loginUser, btnLoading, loading, registerUser, verifyOtp,fetchUser }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
