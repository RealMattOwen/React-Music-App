import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePlaylist, updateSelectedPlaylist } from '../actions/playlists';

const Modal = ({ deletePlaylist, selectedPlaylist: { _id, name }, updateSelectedPlaylist }) => (
    <div className="modal-background">
        <div className="modal">
            <div>
                <h1 className="modal-title">{name}</h1>
                <button className="modal-close" onClick={() => updateSelectedPlaylist()}>
                    <i className="fas fa-times" />
				</button>
            </div>
            <ul className="modal-options">
                <li className="option"><button><Link to={'/playlists/' + _id + '/rename'}>Rename playlist</Link></button></li>
                <li className="option"><button onClick={() => deletePlaylist(_id)}>Delete playlist</button></li>
            </ul>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    deletePlaylist: data => dispatch(deletePlaylist(data)),
    updateSelectedPlaylist: data => dispatch(updateSelectedPlaylist(data))
});

export default connect(undefined, mapDispatchToProps)(Modal);