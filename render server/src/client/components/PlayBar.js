import React from 'react';
import { connect } from 'react-redux';
import AudioPlayer from './AudioPlayer';

const PlayBar = ({ player, playlist, songData }) => (
    <div className="play-bar">
        <AudioPlayer activeTrackIndex={player.currentSong} autoplay playlist={playlist || songData} />
    </div>
);

const mapStateToProps = ({ player, songData }) => ({
    player,
    songData
});

export default connect(mapStateToProps)(PlayBar);