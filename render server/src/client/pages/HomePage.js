import React from 'react';
import { connect } from 'react-redux';
import PlayBar from '../components/PlayBar';
import PlaylistList from '../components/PlaylistList';
import SongList from '../components/SongList';
import { fetchSongData } from '../actions/songs';

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchSongData();
	};
    render() {
        return (
            <div>
				<div className="home-container">
					<PlaylistList />
					{this.props.user ? <SongList actionBtn="add" /> : <SongList />}
				</div>
                {this.props.player && this.props.player.currentSong !== -1 && <PlayBar />}
            </div>
        );
    };
}

const mapStateToProps = ({ player, user }) => ({
    player,
	user
});

const mapDispatchToProps = dispatch => ({
    fetchSongData: () => dispatch(fetchSongData())
});

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(Home),
    loadData: ({ dispatch }) => dispatch(fetchSongData())
};