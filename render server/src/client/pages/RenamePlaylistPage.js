import React from 'react';
import playlistExists from '../components/hocs/playlistExists';
import { renamePlaylist, updateSelectedPlaylist } from '../actions/playlists';

class RenamePlaylist extends React.Component {
    state = {
        newPlaylistName: '',
        playlistId: '',
        playlistName: ''
    };
    componentWillMount() {
        this.setState({
			playlistName: this.props.user.playlists.find(playlist => playlist._id.toString() === this.props.match.params.playlistId).name,
			playlistId: this.props.match.params.playlistId
        });
    };
    componentWillUnmount() {
        this.props.updateSelectedPlaylist();
    };
    handleInputChange = e => {
        const target = e.target;
        const name = target.id;
        const value = target.value;

        if (value.length > 30) {
        	return;
		}

        this.setState({
            [name]: value
        });
    };
    renamePlaylist = e => {
        e.preventDefault();

        if (!this.state.newPlaylistName) {
            this.props.history.push('/playlists');
            return;
        }

        this.props.renamePlaylist({ newPlaylistName: this.state.newPlaylistName, playlistId: this.state.playlistId });
		this.props.history.push('/playlists');
	};
    render() {
        return (
            <div className="form-parent">
				<div className="form-container" style={{ padding: '0 2rem' }}>
					<h2 className="form-title">Enter a new playlist name</h2>
					<form className="form" onSubmit={this.renamePlaylist}>
						<input className="input" id="newPlaylistName" onChange={this.handleInputChange} placeholder={this.state.playlistName} value={this.state.newPlaylistName} />
						<button className="action-btn">Rename</button>
					</form>
				</div>
			</div>
        );
    };
}

const dispatchToProps = dispatch => ({
    renamePlaylist: data => dispatch(renamePlaylist(data)),
    updateSelectedPlaylist: data => dispatch(updateSelectedPlaylist(data))
});

export default {
    component: playlistExists({ dispatchToProps })(RenamePlaylist)
};