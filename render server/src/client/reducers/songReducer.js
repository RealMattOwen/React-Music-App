import { FETCH_SONG_DATA } from '../actions/songs';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_SONG_DATA:
            return action.data.success;
        default:
            return state;
    }
}