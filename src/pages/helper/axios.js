import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const userAPI = rootAPI + "/user";
const catAPI = rootAPI + "/category";
const poAPI = rootAPI + "/payment-option";
const productAPI = rootAPI + "/product";
const jwtAPI = rootAPI + "/get-new-access-jwt";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};
const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

// Assuming this function retrieves a new access JWT
export const getNewAccessJWT = async () => {
  try {
    // Make an API call or perform any other operation to get the new access JWT
    // For example:
    const response = await axios.post(jwtAPI);
    const { status, accessJWT } = response.data;
    return { status, accessJWT };
  } catch (error) {
    console.error("Error getting new access JWT:", error);
    return { status: "error", accessJWT: null };
  }
};

const axiosProcessor = async ({
  method,
  url,
  obj,
  isPrivate,
  refreshToken,
}) => {
  const token = refreshToken ? getRefreshJWT() : getAccessJWT();

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
      error?.response?.data?.message === "jwt expired"
    ) {
      //1. get new accessJWt
      const { status, accessJWT } = await getNewAccessJWT();
      if (status === "success" && accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
      }

      //2. continue the request

      return axiosProcessor({ method, url, obj, isPrivate, refreshToken });
    }
    return {
      status: "error",
      message: error.response ? error?.response?.data?.message : error.message,
    };
  }
};

// ========= admin api

export const getUserDisplay = () => {
  const obj = {
    method: "get",
    url: userAPI + "/display",
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const postNewUser = (data) => {
  const obj = {
    method: "post",
    url: userAPI,
    obj: data,
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
export const postNewUserVerificationInfo = (data) => {
  const obj = {
    method: "post",
    url: userAPI + "/user-verification",
    obj: data,
  };
  return axiosProcessor(obj);
};

// ========= category api
export const postNewCategory = (data) => {
  const obj = {
    method: "post",
    url: catAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const getCategories = () => {
  const obj = {
    method: "get",
    url: catAPI,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const updateCategory = (data) => {
  const obj = {
    method: "put",
    url: catAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const deleteCategory = (_id) => {
  const obj = {
    method: "delete",
    url: catAPI + "/" + _id,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

// ==========+ get new refreshJWT

export const getNewRefreshJWT = () => {
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
      accessJWT: getAccessJWT(),
      refreshJWT: getRefreshJWT(),
    },
  };
  return axiosProcessor(obj);
};

// ========== Payment Option

export const postNewPO = (data) => {
  const obj = {
    method: "post",
    url: poAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const getNewPOs = () => {
  const obj = {
    method: "get",
    url: poAPI,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const updateNewPOs = (data) => {
  const obj = {
    method: "put",
    url: poAPI,
    isPrivate: true,
    obj: data,
  };
  return axiosProcessor(obj);
};

export const deletePO = (_id) => {
  const obj = {
    method: "delete",
    url: poAPI + "/" + _id,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

// ========== Product

export const postNewProduct = (data) => {
  const obj = {
    method: "post",
    url: productAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const updateProduct = (data) => {
  const obj = {
    method: "put",
    url: productAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const getProducts = () => {
  const obj = {
    method: "get",
    url: productAPI,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const deleteProduct = (_id) => {
  const obj = {
    method: "delete",
    url: productAPI + "/" + _id,
    isPrivate: true,
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

export const updateUserProfile = async (data) => {
  const obj = {
    method: "put",
    url: userAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

// ============= Profile ============
export const updateProfile = (data) => {
  const obj = {
    method: "put",
    url: userAPI + "/profile",
    obj: data,
    isPrivate: true,
  };
  console.log(data);
  return axiosProcessor(obj);
};

export const updateProfilePassword = (data) => {
  const obj = {
    method: "put",
    url: userAPI + "/profilePassword",
    obj: data,
  };
  return axiosProcessor(obj);
};
