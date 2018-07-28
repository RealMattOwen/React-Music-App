import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { updateSelectedPlaylist } from '../actions/playlists';

class PlaylistList  extends React.Component {
	togglePlaylistOptions = (e, playlist) => {
		e.preventDefault();

		this.props.updateSelectedPlaylist(playlist);
	};
	render() {
		return (
			<div className="playlists">
				<div className="heading">
					<h2 className="heading-title">My Playlists</h2>
					<Link className="new-playlist-btn" to="/playlists/new">
						<i className="fas fa-plus" />
					</Link>
				</div>
				{this.props.user ? this.props.user.playlists.length > 0 ?
					(
						<Scrollbars className={this.props.player ? "playlist-list-scrollbar with-playbar" : "playlist-list-scrollbar"} universal>
							{this.props.user.playlists.map(({_id, name, songs}, i) => (
								<Link className="playlist" key={i} to={"/playlists/" + _id.toString()}>
									<h3 className="playlist-name">{name}</h3>
									<p className="playlist-song-count">{songs.length !== 1 ? `${songs.length} songs` : `1 song`}</p>
									<button className="playlist-options-btn" onClick={e => this.togglePlaylistOptions(e, {_id, name})}>
										<i className="fas fa-ellipsis-v"/>
									</button>
								</Link>
							))}
						</Scrollbars>
					) : (
						<div className="no-playlists">
							<p>
								You have no playlists, press the
								<span>
									<Link className="new-playlist-btn" to="/playlists/new">
										<i className="fas fa-plus" />
									</Link>
								</span>
								button to create a new playlist and add songs to it.
							</p>
						</div>
					) : (
						<div className="not-logged-in">
							<p><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> so you can create your own playlists!</p>
						</div>
					)
				}
				{this.props.selectedPlaylist && <Modal selectedPlaylist={this.props.selectedPlaylist}/>}
			</div>
		);
	};
}

const mapStateToProps = ({ player, selectedPlaylist, user }) => ({
	player,
	selectedPlaylist,
	user
});

const mapDispatchToProps = dispatch => ({
	updateSelectedPlaylist: data => dispatch(updateSelectedPlaylist(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);