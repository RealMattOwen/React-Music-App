import React from 'react';
import { connect } from 'react-redux';
import requireAuth from '../components/hocs/requireAuth';
import Modal from '../components/Modal';
import PlaylistList from '../components/PlaylistList';
import { updateSelectedPlaylist } from '../actions/playlists';

class MyPlaylists extends React.Component {
    togglePlaylistOptions = (e, playlist) => {
        e.preventDefault();

        this.props.updateSelectedPlaylist(playlist);
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.playlists.length < this.props.user.playlists.length) {
            this.props.updateSelectedPlaylist();
        }
    };
    render() {
        return (
            <div className="playlist-list-page">
				<PlaylistList />
				{this.props.selectedPlaylist && <Modal selectedPlaylist={this.props.selectedPlaylist} />}
            </div>
        );
    };
}

const mapStateToProps = ({ selectedPlaylist }) => ({
    selectedPlaylist
});

const mapDispatchToProps = dispatch => ({
	updateSelectedPlaylist: data => dispatch(updateSelectedPlaylist(data))
});

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(requireAuth(MyPlaylists))
};