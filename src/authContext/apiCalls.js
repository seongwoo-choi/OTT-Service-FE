import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  try {
    dispatch(loginStart());
    const res = await axios.post("https://dev.theotters.net/auth/login", user);

    if (res.data.status === true) {
      dispatch(loginSuccess(res.data));
    }
    if (res.data.status === false) {
      alert(`check your ${user.email}`);
      dispatch(loginFailure());
    }
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 500) {
      alert(`check your password or email address`);
      dispatch(loginFailure());
    }
  }
};
