import postBox from "../apis/postbox";
import history from "../routes/history";
import { ADD_USER, All_USER, SELECT_POSTS } from "./typeConfig";

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
    // redirect to home page
    dispatch(allUser());
    // wait for response of all user get to home page below code
    // const {
    //   data: { message: allUser }
    // } = await postBox.get("/select-user", {
    //   headers: {
    //     auth: token
    //   }
    // });

    // dispatch({
    //   type: All_USER,
    //   payload: allUser
    // });
    history.push("/");
  } else {
    // TODO: Make ui to user know this
    console.log("Not Login");
    history.push("/register");
  }
};

// Post
export const createPost = ({ title, url }) => async (dispatch) => {
  // username,user_id,title,imgurl,likeby:[]
  // console.log();
  const { name, userId } = JSON.parse(
    window.localStorage.getItem("currentUser")
  );
  const token = window.localStorage.getItem("token");
  const response = await postBox.post(
    "/add-post",
    {
      username: name,
      user_id: userId,
      title,
      imgurl: url,
      likeby: []
    },
    {
      headers: {
        auth: token
      }
    }
  );
  console.log(response);
};

export const selectPosts = () => async (dispatch) => {
  const { name, userId } = JSON.parse(
    window.localStorage.getItem("currentUser")
  );
  const token = window.localStorage.getItem("token");
  const response = await postBox.get("/select-post", {
    headers: {
      auth: token
    }
  });
  // console.log(response.data.message);
  dispatch({
    type: SELECT_POSTS,
    payload: response.data.message
  });
};
