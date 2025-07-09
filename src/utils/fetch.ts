import axios from "axios";
import { toast } from "./Toast";
import Cookies from "universal-cookie";
import { log } from "console";

const cookies = new Cookies();
const token = cookies.get("token");
function handleAxiosErr(err: any) {
  if (err.response) {
    // console.log(err.response.data);
    // console.log(err.response.status);
    // console.log(err.response.headers);
    // toast.fire({
    //     icon: 'error',
    //     title: err.response.data.message,
    //     padding: '10px 20px',
    // });
    return err.response;
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log(err.message);
  }
  console.log(err.config);
}

export async function getData(url, config = {}) {
  try {
    console.log(config);
    const { data, status, statusText } = await axios.get(url, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, status, statusText };
  } catch (err) {
    handleAxiosErr(err);
  }
}
export async function postData(url: string, config: any = {}) {
  try {
    const { data, status, statusText } = await axios.post(url, config, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": config?.lang || "en",
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, status, statusText };
    
  } catch (err) {
    return handleAxiosErr(err);
  }
}
export async function putData(url: string, config: any) {
  try {
    const { data, status, statusText } = await axios.post(
      url,
      { _method: "put", ...config },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept-Language": config?.lang || "en",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data, status, statusText };
  } catch (err) {
    return handleAxiosErr(err);
  }
}
export async function delData(url, config = {}) {
  try {
    const { data, status, statusText } = await axios.delete(url, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, status, statusText };
  } catch (err) {
    handleAxiosErr(err);
  }
}
