import { createAction } from 'redux-actions';

const fetchSwitchNavMenu = createAction('SWITCH_NAV_MENU');
export const switchNavMenu = key => dispatch => dispatch(fetchSwitchNavMenu({ result: key }));