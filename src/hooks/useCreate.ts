import { useState } from "react";
import { getData, postData, putData } from "../utils/fetch";
import { toast } from "../utils/Toast";
import { useNavigate } from "react-router-dom";
import { log } from "console";

const useCreate = ({ createUrl, navigateUrl, updateUrl, lang }: any) => {
  const [isDelLoading, setIsDelLoading] = useState(false);

  const navigate = useNavigate();

  const getFormData = async (url: any) => {
    const response = await getData(url);
    return response;
  };

  // CREATE ITEM
  const submitCreateForm = async (data: any) => {
    setIsDelLoading(true);
    try {
      const postedData = await postData(createUrl, { ...data, lang });
      console.log(postedData);

      if ([200, 201].includes(postedData?.status)) {
        toast.fire({
          icon: "success",
          title: postedData?.data.message,
          padding: "10px 20px",
        });

        navigate(navigateUrl);
      }
      if (postedData?.status === 422) {
        toast.fire({
          icon: "error",
          title: postedData.data.message,
          padding: "10px 20px",
        });
      }
      if (postedData?.status === 401) {
        toast.fire({
          icon: "error",
          title: postedData.data.message,
          padding: "10px 20px",
        });
      }
      if (postedData?.status === 500) {
        toast.fire({
          icon: "error",
          title: "حدث خطأ برجاء يمكنك الاتصال بالدعم",
          padding: "10px 20px",
        });
      }
    } catch (error) {
      console.log("errrr", error);
    } finally {
      setIsDelLoading(false);
    }
  };

  //UPDATE USER & ADMIN DATA
  const updateUserAdminForm = async (data: any, setErrors: any) => {
    setIsDelLoading(true);
    const postedData = await postData(
      updateUrl + `/${data?.id ? data?.id : ""}`,
      { ...data, lang, _method: "put" }
    );
    console.log("postedData", postedData);
    if ([200, 201].includes(postedData?.statusText)) {
      toast.fire({
        icon: "success",
        title: postedData?.data.message,
        padding: "10px 20px",
      });
      navigate(navigateUrl);
      setErrors(postedData.data.errors);
    }
    if (postedData?.status === 422) {
      toast.fire({
        icon: "error",
        title: postedData?.data.message,
        padding: "10px 20px",
      });
    }
    if (postedData?.status === 401) {
      toast.fire({
        icon: "error",
        title: postedData?.data.message,
        padding: "10px 20px",
      });
    }
  };

  //updateSettingForm
  const updateSettingForm = async (data: any, setErrors: any) => {
    setIsDelLoading(true);
    const postedData = await postData(updateUrl, { ...data, lang });
    if ([200, 201].includes(postedData?.statusText)) {
      toast.fire({
        icon: "success",
        title: postedData?.data.message,
        padding: "10px 20px",
      });
      navigate(navigateUrl);
      setErrors(postedData.data.errors);
    }
    if (postedData?.status === 422) {
      toast.fire({
        icon: "error",
        title: postedData.data.message,
        padding: "10px 20px",
      });
    }
    if (postedData?.status === 401) {
      toast.fire({
        icon: "error",
        title: postedData.data.message,
        padding: "10px 20px",
      });
    }
  };

  //UPDATE SEMESTER DATA
  const updateForm = async (data: any) => {
    console.log(data);
    setIsDelLoading(true);
    const postedData = await putData(
      updateUrl + `/${data?.id ? data?.id : ""}`,
      { ...data, lang }
    );
    if ([200, 201].includes(postedData?.statusText)) {
      toast.fire({
        icon: "success",
        title: postedData?.data.message,
        padding: "10px 20px",
      });
      //  setErrors(postedData.data.errors);

      navigate(navigateUrl);
    }
    if (postedData?.status === 422) {
      toast.fire({
        icon: "error",
        title: postedData.data.message,
        padding: "10px 20px",
      });
    }
    if (postedData?.status === 401) {
      toast.fire({
        icon: "error",
        title: postedData.data.message,
        padding: "10px 20px",
      });
    }
  };

  return {
    isDelLoading,
    createUrl,
    navigateUrl,
    submitCreateForm,
    updateSettingForm,
    updateUserAdminForm,
    getFormData,
    updateForm,
  };
};

export default useCreate;
