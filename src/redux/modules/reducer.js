import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import timeline from './timeline';
import info from './info';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  timeline,
  info,
});
