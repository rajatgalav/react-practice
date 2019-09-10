import * as actionTypes from '../actions/actionTypes';

export default function loginUser(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER_DETAILS:
      return action.payload.response;
    default:
      return state;
  }
}

export function login(state = false, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return action.payload;
    default:
      return state;
  }
}