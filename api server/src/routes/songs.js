import express from 'express';
import fs from 'fs';
import jsMediaTags from 'jsmediatags';
import path from 'path';
import Song from '../models/song';
const router = express.Router();

// let songData = [];

// fs.readdir(path.resolve(process.cwd(), '../render server/public/music'), (err, files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     files.forEach(file => {
//         jsMediaTags.read(`${path.resolve(process.cwd(), '../render server/public/music')}/${file}`, {
//             onSuccess: ({ tags }) => {
//                 // songData.push({
// 					// artists: tags.artist.split('/'),
// 					// title: tags.title,
// 					// url: `/music/${file}`
//                 // });
//                 // console.log(songData);
//                 Song.create({
// 					artists: tags.artist.split('/'),
//                     title: tags.title,
//                     url: `/music/${file}`
//                 });
//             },
//             onError: error => {
//                 console.log(error);
//             }
//         });
//     });
// });

router.get('/', async (req, res) => {
    const songData = await Song.find({});

    res.status(200).json({ success: songData });
});

export default router;