import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import accountRoutes from './routes/account';
import songRoutes from './routes/songs';

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/music_app');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/account', accountRoutes);
app.use('/songs', songRoutes);

app.listen(3000, () => {
    console.log('listening on port 3000');
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});