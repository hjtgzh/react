import { createAction } from 'redux-actions';
// import { hashHistory } from 'react-router';
import { MockPath } from '../../../config';
// import { backendError } from './common';
import { fetchMock } from '../fetchData';

const fetchHomeListSuccess = createAction('FETCH_HOME_LIST_SUCCESS');
export const fetchHomeList = () => async (dispatch) => {
    console.log(111)
    try {
        const url = `${MockPath}/home/list`;
        const response = await fetchMock(url);
        if (response.data.success) {
            console.log(response.data);
            dispatch(fetchHomeListSuccess({ result: response.data.result }));
        } else {
            console.log('error1')
            // dispatch(loginFailed());
        }
    } catch (err) {
        console.log('error2')        
        // dispatch(backendError('登录失败，请联系管理员'));
    }
};