import { alert } from './alert';
import { fetchCurrentUser } from './user';

export const addSongToPlaylist = ({ playlistId, songId }) => async (dispatch, getState, api) => {
    await api.put(`/account/playlists/${playlistId}/addSong`, { songId })
        .then(() => {
            dispatch(fetchCurrentUser());
        })
        .catch(error => {
            console.clear();
            dispatch(alert({ message: error.response.data.error, type: 'error' }));
        });
};

export const createNewPlaylist = ({ playlistName }) => async (dispatch, getState, api) => {
    await api.put('/account/playlists/new', { playlistName })
        .then(() => {
            dispatch(fetchCurrentUser());
        })
        .catch(error => {
            console.clear();
            dispatch(alert({ message: error.response.data.error, type: 'error' }));
        });
};

export const deletePlaylist = playlistId => async (dispatch, getState, api) => {
    await api.put(`/account/playlists/${playlistId}/delete`)
        .then(() => {
			dispatch(updateSelectedPlaylist());
			dispatch(fetchCurrentUser());
        })
        .catch(error => {
            console.clear();
            dispatch(alert({ message: error.response.data.error, type: 'error' }));
        });
};

export const removeSongFromPlaylist = ({ currentSongId, playlistId, playlistIndex, songId }) => async (dispatch, getState, api) => {
    await api.put(`/account/playlists/${playlistId}/removeSong`, { songId })
        .then(({ data }) => {
            dispatch(alert({ message: data.success, type: 'success' }));
            dispatch(fetchCurrentUser({ currentSongId, playlistIndex }));
        })
        .catch(error => {
            console.clear();
            dispatch(alert({ message: error.response.data.error, type: 'error' }));
        });
};

export const renamePlaylist = ({ playlistId, newPlaylistName }) => async (dispatch, getState, api) => {
    await api.put(`/account/playlists/${playlistId}/rename`, { newPlaylistName })
        .then(() => {
            dispatch(fetchCurrentUser());
        })
        .catch(error => {
            console.clear();
            dispatch(alert({ message: error.response.data.error, type: 'error' }));
        });
};

export const UPDATE_SELECTED_PLAYLIST = 'update_selected_playlist';
export const updateSelectedPlaylist = data => ({
    type: UPDATE_SELECTED_PLAYLIST,
    data
});