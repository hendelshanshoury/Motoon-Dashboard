import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("user");
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

axios.defaults.baseURL = "https://motoon.ammarelgendy.com";

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    try {
      console.log("ressss", error.response.data);

      if (
        error.response.status === 401 &&
        error.response.data.msg === "Unauthenticated" &&
        !error.request?.responseURL?.includes(["verify-email"])
      ) {
        console.log("************Unauthenticated************");
        cookie.remove("user");
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      }
      return Promise.reject(error);
    } catch (error) {
      console.log(error.message === "authentication error");
      return Promise.reject(error);
    }
  }
);
