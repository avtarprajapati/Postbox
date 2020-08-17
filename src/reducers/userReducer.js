import { ADD_USER, All_USER } from "../actions/typeConfig";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return state;
    case All_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};
