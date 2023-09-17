import {
  addToFav,
  getUser,
  getNewAccessJWT,
  signInUser,
  postNewUser,
  updateUser,
  verifyAccount,
} from "../../helper/axios.js";
import { toast } from "react-toastify";
import { setUser } from "../signin-signup/userSlice.js";

export const createNewUserAction = async (obj) => {
  const pendingResp = postNewUser(obj);

  toast.promise(pendingResp, {
    pending: "Please await..",
  });
  const { status, message } = await pendingResp;
  toast[status](message);
};
export const updateUserAction = (userObj) => async (dispatch) => {
  const pendingResp = updateUser(userObj);
  toast.promise(pendingResp, { Pending: "Please Wait" });
  const { status, message } = await pendingResp;
  toast[status](message);
  dispatch(getUserProfileAction());

  if (status === "success") {
    return true;
  }
};
export const SignInUserAction = (userData) => async (dispatch) => {
  const pendingResp = signInUser(userData);
  toast.promise(pendingResp, { Pending: "Please Wait" });

  const { status, message, token } = await pendingResp;
  toast[status](message);
  if (status === "success") {
    sessionStorage.setItem("accessJWT", token.accessJWT); ///active for 5mins
    localStorage.setItem("refreshJWT", token.refreshJWT); //active for 30days
    dispatch(getUserProfileAction());
    return true;
  }
};

export const verifyAccountAction = (obj) => async (dispatch) => {
  const pending = verifyAccount(obj);
  toast.promise(pending, { pending: "Please Wait" });
  const { status, message } = await pending;
  toast[status](message);
  const isverified =
    status === "success" || message === "Already verified" ? true : false;
  return isverified;
};

// getadmin aciton

export const getUserProfileAction = () => async (dispatch) => {
  //call the api to get user info
  const { status, user } = await getUser();
  //mount the state with the user data
  if (status === "success") {
    dispatch(setUser(user));
  }
};

export const autoLogin = () => async (dispatch) => {
  // check if accessJWT exist
  const accessJWT = sessionStorage.getItem("accessJWT");
  if (accessJWT) {
    return dispatch(getUserProfileAction());
  }
  const refreshJWT = localStorage.getItem("refreshJWT");
  if (refreshJWT) {
    // request new session token form the server
    const { accessJWT } = await getNewAccessJWT();
    if (accessJWT) {
      sessionStorage.setItem("accessJWT", accessJWT);
    }
    dispatch(getUserProfileAction());
  }
};

export const addTofavAction = (obj) => async (dispatch) => {
  const result = await addToFav(obj);
  if (result.status === "success") {
    dispatch(getUserProfileAction());
  }
  return result;
};
