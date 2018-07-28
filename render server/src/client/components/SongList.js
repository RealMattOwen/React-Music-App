import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addSongToPlaylist, removeSongFromPlaylist } from '../actions/playlists';
import { updateCurrentSong } from '../actions/songs';

class SongList extends React.Component {
    state = {
        playlist: [],
        selectedPlaylist: null,
        selectedSong: null
    };
    componentWillMount() {
        const playlist = this.props.playlist || this.props.songData;
        this.setState({ playlist });
    };
    componentWillReceiveProps(nextProps) {
        if (this.props.playlist !== nextProps.playlist) {
            const playlist = nextProps.playlist || nextProps.songData;
            this.setState({ playlist });
        }

        if (!this.props.songData && nextProps.songData) {
            const playlist = this.props.playlist || nextProps.songData;
            this.setState({ playlist });
        }
    };
    componentWillUnmount() {
        this.props.updateCurrentSong(null);
    };
    togglePlaylistModal = (e, song) => {
        e.stopPropagation();

        this.setState({ selectedSong: song });
    };
    addSongToPlaylist = songId => {
        if (!this.state.selectedPlaylist) {
            return;
        }

        this.props.addSongToPlaylist({ playlistId: this.state.selectedPlaylist, songId });
        this.setState({ selectedPlaylist: null, selectedSong: null });
    };
    removeSongFromPlaylist = (e, { _id: songId }) => {
        e.stopPropagation();

		if (this.props.player) {
			const playlistIndex = this.props.user.playlists.findIndex(playlist => playlist._id === this.props.match.params.playlistId);

			if (this.props.user.playlists[playlistIndex].songs[this.props.player.currentSong]._id === songId) {
				this.props.updateCurrentSong(null);
			}

			const currentSongId = this.props.user.playlists[playlistIndex].songs[this.props.player.currentSong]._id;

			this.props.removeSongFromPlaylist({ currentSongId, playlistId: this.props.match.params.playlistId, playlistIndex, songId });
		} else {
			this.props.removeSongFromPlaylist({ playlistId: this.props.match.params.playlistId, songId });
		}
    };
    updateCurrentSong = e => {
        const newCurrentSong = this.state.playlist.findIndex(song => song.title === e.currentTarget.children[0].textContent);
        this.props.updateCurrentSong({ currentSong: newCurrentSong });
    };
    render() {
        return (
			<div className="songs" style={{ flex: 3 }}>
				<div className="columns">
					<h2 className="song-titles">Title</h2>
					<h2 className="song-artists">Artist</h2>
				</div>
				{this.state.playlist && this.state.playlist.length > 0 ?
					(
						<div className="song-list">
							<Scrollbars className={this.props.player ? "song-list-scrollbar with-playbar" : "song-list-scrollbar"} universal>
								{this.state.playlist.map((song, i) => (
									<div className="song" key={i} onClick={this.updateCurrentSong}>
										<div className="song-title">{song.title}</div>
										<div className="song-artists">{song.artists.map((artist, i) => <span className="song-artist" key={i}>{artist}</span>)}</div>
										{
											this.props.actionBtn === 'add' ? (
												<button className="action-btn" onClick={e => this.togglePlaylistModal(e, song)}>
													<i className="fas fa-plus" />
												</button>
											) : this.props.actionBtn === 'remove' ? (
												<button className="action-btn" onClick={e => this.removeSongFromPlaylist(e, song)}>
													<i className="fas fa-minus" />
												</button>
											) : null
										}
									</div>
								))}
							</Scrollbars>
						</div>
					) : (
						<div className="no-playlist">
							{this.props.location.pathname !== '/' ? <Link to="/">Click here to add songs to your playlists</Link> : <div>No songs are currently available</div>}
						</div>
					)
				}
				{this.state.selectedSong &&
					(
						<div className="modal-background">
							{this.props.user && this.props.user.playlists.length > 0 && this.props.user.playlists.filter(playlist => {
								return playlist.songs.every(song => {
									return JSON.stringify(song) !== JSON.stringify(this.state.selectedSong);
								});
							}).length > 0 ?
								(
									<div className="modal">
										<h1 className="modal-title">Select a playlist to add this song to</h1>
										<button className="modal-close" onClick={() => this.setState({ selectedSong: null })}>
											<i className="fas fa-times"/>
										</button>
										<Scrollbars autoHeight className="select-playlist-scrollbar" autoHeightMax="15rem" universal>
											{this.props.user.playlists.filter(playlist => {
												return playlist.songs.every(song => {
													return JSON.stringify(song) !== JSON.stringify(this.state.selectedSong);
												});
											}).map((playlist, i) => (
												<button className={this.state.selectedPlaylist === playlist._id ? "playlist active" : "playlist"} key={i} onClick={() => {
													if (this.state.selectedPlaylist !== playlist._id) {
														this.setState({ selectedPlaylist: playlist._id });
													}
												}}>{playlist.name}</button>
											))}
										</Scrollbars>
										<div>
											<button className="add-to-playlist-btn" onClick={() => this.addSongToPlaylist(this.state.selectedSong._id)}>Add to playlist</button>
										</div>
									</div>
								) : (
									<div className="modal">
										<h1>This song already exists in all of your playlists</h1>
									</div>
								)
							}
						</div>
					)
				}
			</div>
        );
    };
}

const mapStateToProps = ({ player, songData, user }) => ({
    player,
    songData,
    user
});

const mapDispatchToProps = dispatch => ({
    addSongToPlaylist: data => dispatch(addSongToPlaylist(data)),
    removeSongFromPlaylist: data => dispatch(removeSongFromPlaylist(data)),
    updateCurrentSong: data => dispatch(updateCurrentSong(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SongList));