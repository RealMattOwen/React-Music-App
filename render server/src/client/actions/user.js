import { alert } from './alert';
import { updateCurrentSong } from './songs';

export const CLEAR_CURRENT_USER = 'clear_current_user';
export const clearCurrentUser = () => ({
        type: CLEAR_CURRENT_USER
});

export const logout = () => dispatch => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    dispatch(clearCurrentUser());
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = songAndPlaylistData => async (dispatch, getState, api) => {
    await api.get('/account/current_user')
        .then(({ data }) => {
            dispatch({
                type: FETCH_CURRENT_USER,
                data
            });
			if (songAndPlaylistData && songAndPlaylistData.currentSongId && songAndPlaylistData.playlistIndex) {
				const newSongIndex = data.user.playlists[songAndPlaylistData.playlistIndex].songs.findIndex(song => song._id === songAndPlaylistData.currentSongId);

				dispatch(updateCurrentSong({ currentSong: newSongIndex }));
			}
        })
        .catch(error => {
        	console.clear();
            dispatch({
                type: FETCH_CURRENT_USER,
                data: error
            });
        });
};

export const login = ({ email, password }) => async (dispatch, getState, api) => {
    await api.post('/account/login', { email, password })
        .then(() => {
            dispatch(alert());
            dispatch(fetchCurrentUser());
        })
        .catch(error => {
            console.clear();
            switch (error.response.status) {
                case 401:
                    dispatch(alert({ message: 'Incorrect email or password', type: 'error' }));
                    break;
                case 403:
                    dispatch(alert({ message: error.response.data.error, type: 'error' }));
                    break;
            }
        });
};

export const signUp = ({ email, password, username }) => async (dispatch, getState, api) => {
    await api.post('/account/signup', { email, password, username })
        .then(() => {
			dispatch(fetchCurrentUser());
        })
        .catch(error => {
            console.clear();
            dispatch(alert({ message: error.response.data.error, type: 'error' }));
        });
};