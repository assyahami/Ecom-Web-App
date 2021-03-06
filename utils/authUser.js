import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";

import Router from "next/router";
import cookie from "js-cookie";

export const registerUser = async (
  data,
  profilePicUrl,
  setErrorMsg,
  setFormLoading
) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, {
      data,
      profilePicUrl,
    });

    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setErrorMsg(errorMsg);
  }
  setFormLoading(false);
};

export const loginUser = async (data, setError) => {
  try {
    const res = await axios.post(`${baseUrl}/api/login`, { data });
    // console.log(res.data)
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    // it means http req on server side
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    // if user on client side
    Router.push(location);
  }
};

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};

export const logoutUser = (username) => {
  // cookie.set("username", username);
  // cookie.remove("token");
  Router.push("/Authentication");
  Router.reload();
};
