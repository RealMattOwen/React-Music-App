import React from 'react';
import { connect } from 'react-redux';
import requireAuth from '../components/hocs/requireAuth';
import Alert from '../components/Alert';
import { alert } from '../actions/alert';
import { createNewPlaylist } from '../actions/playlists';

class NewPlaylist extends React.Component {
    state = {
        playlistName: ''
    };
    componentWillUnmount() {
        this.props.alert();
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
    handleCreateNewPlaylist = e => {
        e.preventDefault();

        if (!this.state.playlistName) {
            this.props.alert({ message: 'Provide a name to create a new playlist', type: 'error' });
            return;
        }

        this.props.createNewPlaylist(this.state);
        this.props.history.push('/playlists');
    };
    render() {
        return (
        	<div className="form-parent">
				<div className="form-container" style={{ padding: '0 2rem' }}>
					<h1 className="form-title">Enter a name for the playlist</h1>
					<form className="form" onSubmit={this.handleCreateNewPlaylist}>
						<input className="input" id="playlistName" onChange={this.handleInputChange} placeholder="Enter a playlist name" value={this.state.playlistName} />
						<button className="action-btn">Create</button>
					</form>
					{this.props.alertData &&
						(
							<Alert
								message={<div>{this.props.alertData.message}</div>}
								type={this.props.alertData.type}
							/>
						)
					}
				</div>
			</div>
        );
    };
}

const mapStateToProps = ({ alertData }) => ({
    alertData
});

const mapDispatchToProps = dispatch => ({
    alert: data => dispatch(alert(data)),
    createNewPlaylist: data => dispatch(createNewPlaylist(data))
});

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(requireAuth(NewPlaylist))
};