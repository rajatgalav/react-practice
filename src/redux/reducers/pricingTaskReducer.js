import { FETCH_REPORT_TABS } from '../actions/actionTypes';

export function fetchReportsURL(state = {}, action) {
  switch (action.type) {
    case FETCH_REPORT_TABS:
      return action.payload.response;
    default:
      return state;
  }
}