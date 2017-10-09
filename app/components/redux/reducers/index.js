import { combineReducers } from 'redux';

import homeQuery from './home';

/**
 * 合并reducer
 */
const rootReducer = combineReducers({
    homeQuery
});

export default rootReducer;