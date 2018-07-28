import { ALERT } from '../actions/alert';

export default (state = null, action) => {
    switch (action.type) {
        case ALERT:
            return action.data || null;
        default:
            return state;
    }
}