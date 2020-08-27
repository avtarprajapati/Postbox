import postBox from "../apis/postbox";
import history from "../routes/history";
import { ADD_USER, All_USER, SELECT_POSTS, EDIT_POST } from "./typeConfig";

import { toast } from "react-toastify";

// User

export const createUser = ({ name, email, password, dob }) => async (
  dispatch
) => {
  const response = await postBox.post("/add-user", {
    name,
    email,
    password,
    dob,
    imgurl: `https://avatars.dicebear.com/api/bottts/${name}.svg`,
    following: [],
    followers: []
  });

  if (response.data.status !== "OK") {
    console.log("Please try again");
  }

  dispatch({
    type: ADD_USER
  });

  history.push("/login");
};

export const allUser = () => async (dispatch) => {
  const token = window.localStorage.getItem("token");

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
};

export const editUser = (upateValue) => async (dispatch) => {
  const token = window.localStorage.getItem("token");

  await postBox.post("/edit-user", upateValue, {
    headers: {
      auth: token
    }
  });

  dispatch(allUser());
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

  if (response.data.status === "OK") {
    dispatch(allUser());

    history.push("/");
    toast.dark("Welcome to Postbox " + response.data.name);
  } else {
    // TODO: Make ui to user know this
    history.push("/register");
    toast.error("User not Found!");
  }
};

// Post
export const createPost = ({ title, url }) => async (dispatch) => {
  const { name, userId } = JSON.parse(
    window.localStorage.getItem("currentUser")
  );
  const token = window.localStorage.getItem("token");
  await postBox
    .post(
      "/add-post",
      {
        username: name,
        user_id: userId,
        title,
        imgurl: url,
        likedby: []
      },
      {
        headers: {
          auth: token
        }
      }
    )
    .then(() => {
      history.push("/profile");
      toast.success("Photo Uploaded!");
    });
};

export const selectPosts = () => async (dispatch) => {
  const token = window.localStorage.getItem("token");
  const response = await postBox.get("/select-post", {
    headers: {
      auth: token
    }
  });

  dispatch({
    type: SELECT_POSTS,
    payload: response.data.message
  });
};

export const editPost = (updateValue) => async (dispatch) => {
  const token = window.localStorage.getItem("token");

  await postBox.post("/edit-post", updateValue, {
    headers: {
      auth: token
    }
  });

  const response = await postBox.get("/select-post", {
    headers: {
      auth: token
    }
  });

  dispatch({
    type: EDIT_POST,
    payload: response.data.message
  });
};
