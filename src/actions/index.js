import postBox from "../apis/postbox";
import history from "../routes/history";
import { ADD_USER } from "./typeConfig";

export const createUser = async (values) => {
  const response = await postBox.post("/add-user", {
    ...values,
    following: [],
    follower: [],
  });
  if (response.data.status !== "OK") {
    console.log("Please try again");
  }
  // history.push("/login");

  return {
    type: ADD_USER,
    payload: JSON.parse(response.config.data),
  };
};
