import { UPDATE_CURRENT_SONG } from '../actions/songs';

export default (state = null, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_SONG:
            return action.data;
        default:
            return state;
    }
}