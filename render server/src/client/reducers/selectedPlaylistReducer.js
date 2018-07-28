import { UPDATE_SELECTED_PLAYLIST } from '../actions/playlists';

export default (state = null, action) => {
    switch (action.type) {
        case UPDATE_SELECTED_PLAYLIST:
            return action.data || null;
        default:
            return state;
    }
}