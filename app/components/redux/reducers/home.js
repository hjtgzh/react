import { handleActions } from 'redux-actions';
/**
 * 分析工具
 */
const homeDefaultState = {
    
};

const homeQuery = handleActions({
    FETCH_HOME_LIST_SUCCESS: (state, action) => ({
        ...state,
        homeListData: action.payload.result,
    })
}, homeDefaultState);

export default homeQuery;