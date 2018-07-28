import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import randomString from 'randomstring';
import { JwT_SECRET } from '../configuration';
import '../passport';
import Song from '../models/song';
import User from '../models/user';

const router = express.Router();

const signToken = user => {
    return jwt.sign({
        iss: 'MattOwen',
        sub: user._id,
        iat: new Date().getTime()
    }, JwT_SECRET);
};

const encryptPassword = async password => bcrypt.hash(password, await bcrypt.genSalt(10));

router.get('/current_user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findById(req.user._id).populate('playlists.songs');

    res.status(200).json({ user });
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Missing data required for sign up' });
        return;
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
        res.status(403).json({ error: 'This email is already in use' });
        return;
    }

    try {
        const newUser = new User({
            email,
            password: await encryptPassword(password)
        });

        await newUser.save();

		const token = signToken(newUser);
		res.status(200).cookie('jwt', token, { expires: new Date(Date.now() + 900000000000) }).json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Incorrect data, please try again' });
    }
});

router.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
    const token = signToken(req.user);
    res.status(200).cookie('jwt', token, { expires: new Date(Date.now() + 900000000000) }).json({ token });
});

router.put('/playlists/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { playlistName } = req.body;

    if (!playlistName) {
        res.status(400).json({ error: 'Missing data required to create a new playlist' });
        return;
    }

    const user = await User.findById(req.user._id);

    playlistName = playlistName.substr(0, 30);

    user.playlists.push({ name: playlistName });

    await user.save();

	res.status(200).json({ success: `The playlist, ${playlistName} has been created successfully. ` });
});

router.put('/playlists/:playlistId/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { playlistId } = req.params;

    if (!playlistId) {
        res.status(400).json({ error: 'Missing data required to delete a playlist' });
        return;
    }

    const user = await User.findById(req.user._id);

    const playlistIndex = user.playlists.findIndex(playlist => playlist._id.toString() === playlistId);

    user.playlists = user.playlists.filter(playlist => playlist._id.toString() !== playlistId);

    await user.save();

    res.status(200).json({ success: `${user.playlists[playlistIndex]} has been deleted successfully` });
});

router.put('/playlists/:playlistId/rename', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { playlistId } = req.params;
    let { newPlaylistName } = req.body;

    if (!newPlaylistName) {
        res.status(400).json({ error: 'Missing data required to rename this playlist' });
        return;
    }

    const user = await User.findById(req.user._id);

    const playlistIndex = user.playlists.findIndex(playlist => playlist._id.toString() === playlistId);

	newPlaylistName = newPlaylistName.substr(0, 30);

	user.playlists[playlistIndex].name = newPlaylistName;

    await user.save();

    res.status(200).json({ success: `${user.playlists[playlistIndex].name} has been renamed successfully. ` });
});

router.put('/playlists/:playlistId/addSong', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.body;

    const song = await Song.findById(songId);

    const user = await User.findById(req.user._id);

    const playlistIndex = user.playlists.findIndex(playlist => playlist._id.toString() === playlistId);


    // add a check for existing song already

    user.playlists[playlistIndex].songs.push(song);

    await user.save();

    res.status(200).json({ success: `${song.title} has been added to ${user.playlists[playlistIndex].name} successfully. ` });
});

//
// ADD CHECKS FOR A LOT OF OTHER THINGS THROUGHOUT THIS FILE
//
//

router.put('/playlists/:playlistId/removeSong', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.body;

    const song = await Song.findById(songId);

    const user = await User.findById(req.user._id).populate('playlists.songs');

    const playlistIndex = user.playlists.findIndex(playlist => playlist._id.toString() === playlistId);

    user.playlists[playlistIndex].songs = user.playlists[playlistIndex].songs.filter(individualSong => individualSong._id.toString() !== songId);

    await user.save();

    res.status(200).json({ success: `${song.title} has been removed from ${user.playlists[playlistIndex].name} successfully. ` });
});

export default router;