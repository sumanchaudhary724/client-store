import { toast } from "react-toastify";
import {
  getUserDisplay,
  getUserInfo,
  getNewRefreshJWT,
  postNewUser,
  signInUser,
  updateUserProfile,
} from "../../helper/axios";
import { setUser, setUsers } from "./userSlice";

export const createNewUserAction = async (obj) => {
  const pendingResp = postNewUser(obj);

  toast.promise(pendingResp, {
    pending: "Please await..",
  });
  const { status, message } = await pendingResp;
  toast[status](message);
};

export const signInUserAction = (obj) => async (dispatch) => {
  const pendingResp = signInUser(obj);

  toast.promise(pendingResp, {
    pending: "Please await..",
  });
  const { status, message, token } = await pendingResp;

  toast[status](message);

  if (status === "success") {
    sessionStorage.setItem("accessJWT", token.accessJWT);
    localStorage.setItem("refreshJWT", token.refreshJWT);

    dispatch(getUserProfileAction());
  }

  //get the user data and mount in the state
};

//get admin profile
export const getUserProfileAction = () => async (dispatch) => {
  //call the api to get user info
  const { status, user } = await getUserInfo();
  //mount the state with the user data

  if (status === "success") {
    dispatch(setUser(user));
  }
};

////// get all the admin
export const getUserDisplayAction = () => async (dispatch) => {
  // call the api to get user info
  const { status, user } = await getUserDisplay();

  //mount the state with the user data, setAdmin() form adminSlice
  if (status === "success") {
    dispatch(setUsers(user));
  }
};

// New action for updating admin profile
export const updateProfileUser = (userObj) => async (dispatch) => {
  const pendingResp = updateUserProfile(userObj);
  toast.promise(pendingResp, { Pending: "Please Wait" });
  const { status, message } = await pendingResp;
  toast[status](message);
  dispatch(getUserProfileAction());
};

export const autoLogin = () => async (dispatch) => {
  // check if accessJWT exist in session

  const accessJWT = sessionStorage.getItem("accessJWT");
  if (accessJWT) {
    return dispatch(getUserProfileAction());
  }

  const refreshJWT = localStorage.getItem("refreshJWT");
  if (refreshJWT) {
    // request new accessJWT from server and all getAdminProfile

    const { accessJWT } = await getNewRefreshJWT();

    if (accessJWT) {
      sessionStorage.setItem("accessJWT", accessJWT);
      dispatch(getUserProfileAction());
    }
  }
};
