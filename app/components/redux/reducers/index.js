import { combineReducers } from 'redux';

import homeQuery from './home';
import navQuery from './nav';

/**
 * 合并reducer
 */
const rootReducer = combineReducers({
    homeQuery,
    navQuery
});

export default rootReducer;