import { ADD_USER } from "../actions/typeConfig";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      console.log(action.payload);
      return [...state, action.payload];
    default:
      console.log("default");
      return state;
  }
};
