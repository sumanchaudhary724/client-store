import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const userAPI = rootAPI + "/user";
const catApi = rootAPI + "/category";
const productApi = rootAPI + "/product";

const getAccessJWt = () => {
  return sessionStorage.getItem("accessJWT");
};
const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};
export const axiosProcessor = async ({
  method,
  url,
  obj,
  isPrivate,
  refreshToken,
}) => {
  const token = refreshToken ? getRefreshJWT() : getAccessJWt();
  const headers = {
    Authorization: isPrivate ? token : null,
  };
  try {
    const { data } = await axios({
      method,
      url,
      data: obj,
      headers,
    });
    return data;
  } catch (error) {
    if (
      error?.response?.status === 403 &&
      error?.response?.data?.message ===
        "Your token has expired. Please login Again"
    ) {
      // 1. get new access Jwt
      const { status, accessJWT } = await getNewAccessJWT();
      if (status === "success") {
        sessionStorage.setItem("accessJWT", accessJWT);
        return axiosProcessor({ method, url, obj, isPrivate, refreshToken });
      }
    }
    if (error?.response?.data?.message === "jwt expired") {
      console.log("refresh token expired");
      // logoutUser();
    }
    return {
      status: "error",
      message: error.response ? error?.response?.data?.message : error.message,
      error,
    };
  }
};

// create user
export const postNewUser = (data) => {
  const obj = {
    method: "post",
    url: userAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const postNewUserVerificationInfo = (data) => {
  const obj = {
    method: "post",
    url: userAPI + "/user-verification",
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const getAllUsers = () => {
  const obj = {
    method: "get",
    url: userAPI + "/get-users",
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const updateUser = (data) => {
  const { oldPassword, newPassword } = data;
  console.log(oldPassword, newPassword);
  const obj = {
    method: "put",
    url: oldPassword && newPassword ? userAPI + "/change-password" : userAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const getUser = () => {
  const obj = {
    method: "get",
    url: userAPI,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const signInUser = (data) => {
  const obj = {
    method: "post",
    url: userAPI + "/sign-in",
    obj: data,
  };
  return axiosProcessor(obj);
};

export const verifyAccount = (object) => {
  const obj = {
    method: "put",
    url: userAPI + "/verify",
    obj: object,
  };
  return axiosProcessor(obj);
};

export const getNewAccessJWT = () => {
  //refreshtoken is sent to get access token
  const obj = {
    method: "get",
    url: userAPI + "/get-accessjwt",
    isPrivate: true,
    refreshToken: true,
  };
  return axiosProcessor(obj);
};

export const logoutUser = (_id) => {
  const obj = {
    method: "post",
    url: userAPI + "/logout",
    obj: {
      _id,
      accessJWT: getAccessJWt(),
      refreshJWT: getRefreshJWT(),
    },
  };
  return axiosProcessor(obj);
};

// ======== restet password
export const requestPassOTP = (email) => {
  const obj = {
    method: "post",
    url: userAPI + "/request-opt",
    obj: { email },
  };
  return axiosProcessor(obj);
};
export const resetPass = (data) => {
  const obj = {
    method: "post",
    url: userAPI + "/reset-password",
    obj: data,
  };
  return axiosProcessor(obj);
};
export const changePassword = (formObj) => {
  console.log(formObj);
  const obj = {
    method: "post",
    url: userAPI + "/change-password",
    obj: formObj,
  };
  return axiosProcessor(obj);
};

//category and product
export const getCategories = async () => {
  const obj = {
    method: "get",
    url: catApi,
  };
  return axiosProcessor(obj);
};

export const getProducts = async (object) => {
  const obj = {
    method: "get",
    url: !object ? productApi : productApi + `/${object?.slug}`,
  };
  return axiosProcessor(obj);
};
export const getProductsByCat = async (object) => {
  const obj = {
    method: "get",
    url: productApi + `/categories` + `/${object?._id}`,
  };
  return axiosProcessor(obj);
};

export const addToFav = async (object) => {
  const obj = {
    method: "POST",
    url: `${userAPI}/addFav`,
    obj: object,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
