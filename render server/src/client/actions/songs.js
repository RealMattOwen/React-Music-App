export const FETCH_SONG_DATA = 'fetch_song_data';
export const fetchSongData = () => async (dispatch, getState, api) => {
    await api.get('/songs')
        .then(({ data }) => {
            dispatch({
                type: FETCH_SONG_DATA,
                data
            });
        })
        .catch(error => {
            console.clear();
            dispatch({
                type: FETCH_SONG_DATA,
                data: error
            });
        });
};

export const UPDATE_CURRENT_SONG = 'update_current_song';
export const updateCurrentSong = data =>({
    type: UPDATE_CURRENT_SONG,
    data
});