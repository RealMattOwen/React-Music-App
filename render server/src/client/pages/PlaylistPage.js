import React from 'react';
import playlistExists from '../components/hocs/playlistExists';
import PlayBar from '../components/PlayBar';
import SongList from '../components/SongList';
import { fetchSongData } from '../actions/songs';

class Playlist extends React.Component {
	render() {
		return (
			<div className="playlist-page">
				<h1 className="playlist-title">{this.props.user.playlists[this.props.activePlaylist].name}</h1>
				<SongList actionBtn="remove" playlist={this.props.user.playlists[this.props.activePlaylist].songs} />
				{this.props.player && this.props.player.currentSong !== -1 && <PlayBar playlist={this.props.user.playlists[this.props.activePlaylist].songs} />}
			</div>
		);
	};
}

const stateToProps = ({ player }) => ({
    player
});

export default {
    component: playlistExists({ stateToProps })(Playlist),
	loadData: ({ dispatch }) => dispatch(fetchSongData())
};