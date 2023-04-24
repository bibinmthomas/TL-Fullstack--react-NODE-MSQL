import {
  userLoginFail,
  userLoginReq,
  userLoginSuccess,
  userLogout,
} from "../features/users/userLoginSlice";

import {
  userRegisterReq,
  userRegisterSuccess,
  userRegisterFail,
} from "../features/users/userRegisterSlice";

import axiosConfig from "../axiosConfig";

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

    const { data } = await axiosConfig.post(
      `login`,
      {
        email,
        password,
      },
      config
    );
    console.log(data);
    if (data.message) {
      dispatch(userLoginFail(data.message));
    } else {
      dispatch(userLoginSuccess(data));
    }
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

export const register =
  (name, email, password) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      dispatch(userRegisterReq());
      console.log("In Actions:", name, email, password);

      const { data } = await axiosConfig.post(
        `/register`,
        {
          name,
          email,
          password,
        },
        config
      );

      if (data.message) {
        dispatch(userRegisterFail(data.message));
      } else {
        dispatch(userRegisterSuccess(data));
      }
      dispatch(userLoginSuccess(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userRegisterFail(errorIs));
    }
  };
