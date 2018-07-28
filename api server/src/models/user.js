import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        lowercase: true,
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    playlists: [
        {
            name: String,
            songs: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Song'
                }
            ]
        }
    ]
});

userSchema.methods.isPasswordValid = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

export default mongoose.model('User', userSchema);