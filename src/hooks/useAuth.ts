import { useNavigate } from "react-router-dom";
import { toast } from "../utils/Toast";
import { useState } from "react";
import { postData } from "../utils/fetch";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
const useAuth = ({ loginUrl, navigateUrl }) => {
  const [isDelLoading, setIsDelLoading] = useState(false);

  const navigate = useNavigate();

  // Login
  const submitLoginForm = async (data: any) => {
    try {
      setIsDelLoading(true);

      const postedData = await postData(loginUrl, { ...data });
      console.log(postedData);
      if (postedData?.status === 200) {
        toast.fire({
          icon: "success",
          title: postedData?.data?.message,
          padding: "10px 20px",
        });
        cookies.set("user", postedData?.data.data.admin, { path: "/" });
        cookies.set("token", postedData?.data.data.token, { path: "/" });
        console.log(postedData.data?.data.token);
        console.log(postedData.data?.data.admin);

        axios.defaults.headers.common.Authorization = `Bearer ${postedData.data?.data.token}`;
        navigate(navigateUrl);
      }
      if (postedData?.status === 422) {
        toast.fire({
          icon: "error",
          title: postedData.data?.message,
          padding: "10px 20px",
        });
      }
      if (postedData?.status === 401) {
        toast.fire({
          icon: "error",
          title: postedData.data?.message,
          padding: "10px 20px",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { isDelLoading, loginUrl, navigateUrl, submitLoginForm };
};

export default useAuth;
