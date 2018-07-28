import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    artists: [
		{
			required: true,
			type: String
		}
    ],
    title: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    }
});

export default mongoose.model('Song', songSchema);