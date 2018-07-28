import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import requireAuth from './requireAuth';

export default ({ stateToProps = () => ({}), dispatchToProps = () => ({}) }) => ChildComponent => {
    class playlistExists extends React.Component {
    	state = {
    		activePlaylist: null
		};
        componentWillMount() {
            const playlistIndex = this.props.user.playlists.findIndex(playlist => this.props.match.params.playlistId === playlist._id);
            this.setState({ activePlaylist: playlistIndex });
        };
        render() {

			if (this.state.activePlaylist !== null) {
				if (this.state.activePlaylist > -1) {
					return <ChildComponent activePlaylist={this.state.activePlaylist} {...this.props} />;
                } else if (this.state.activePlaylist === -1) {
					return <Redirect to="/playlists" />;
                } else {
					return null;
                }
            } else {
				return null;
            }
        };
    }

    const mapStateToProps = store => {
        const requiredProps = {
            user: store.user
        };

        return stateToProps ? Object.assign(requiredProps, stateToProps(store)) : stateToProps;
    };

    const mapDispatchToProps = dispatch => {
        return dispatchToProps ? Object.assign(dispatchToProps(dispatch)) : {};
    };

    return connect(mapStateToProps, mapDispatchToProps)(requireAuth(playlistExists));
};