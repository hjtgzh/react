import { handleActions } from 'redux-actions';
/**
 * 导航
 */
const navDefaultState = {
    current: '1'
};

const navQuery = handleActions({
    SWITCH_NAV_MENU: (state, action) => ({
        ...state,
        current: action.payload.result,
    })
}, navDefaultState);

export default navQuery;