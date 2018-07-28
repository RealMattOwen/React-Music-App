import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import playerReducer from './playerReducer';
import selectedPlaylistReducer from './selectedPlaylistReducer';
import songReducer from './songReducer';
import userReducer from './userReducer';

export default combineReducers({
	alertData: alertReducer,
    player: playerReducer,
    selectedPlaylist: selectedPlaylistReducer,
    songData: songReducer,
    user: userReducer
});