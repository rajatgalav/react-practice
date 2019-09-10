import { combineReducers } from 'redux';

import { fetchReportsURL } from './pricingTaskReducer';
import loginUser, { login } from './loginReducer';

const rootReducer = combineReducers({
  loginUser,
  login,
  fetchReportsURL,
});

export default rootReducer;