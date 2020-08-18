import postBox from "../apis/postbox";
import history from "../routes/history";
import { ADD_USER, All_USER } from "./typeConfig";

export const createUser = (values) => async (dispatch) => {
  const response = await postBox.post("/add-user", {
    ...values,
    following: [],
    follower: []
  });

  if (response.data.status !== "OK") {
    console.log("Please try again");
  }

  // const allUser = await postBox.get('/select-user')

  dispatch({
    type: ADD_USER
  });

  history.push("/login");
};

export const verifyUser = ({ email, password }) => async (dispatch) => {
  const response = await postBox.post("/verify-user", {
    email,
    password
  });

  const token = response.data.token;
  const currentUser = JSON.stringify({
    name: response.data.name,
    userId: response.data._id
  });
  // set token in localStorage after verify user
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("currentUser", currentUser);

  const {
    data: { message: allUser }
  } = await postBox.get("/select-user", {
    headers: {
      auth: token
    }
  });

  dispatch({
    type: All_USER,
    payload: allUser
  });
  history.push("/");
};
