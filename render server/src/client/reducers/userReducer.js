import { CLEAR_CURRENT_USER, FETCH_CURRENT_USER } from '../actions/user';

export default (state = null, action) => {
    switch (action.type) {
        case CLEAR_CURRENT_USER:
            return false;
        case FETCH_CURRENT_USER:
            return action.data.user || false;
        default:
            return state;
    }
}