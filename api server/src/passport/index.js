import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import { JwT_SECRET } from '../configuration';
import User from '../models/user';

const cookieExtractor = req => {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JwT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        if (!user) {
            done(null, false);
            return;
        }

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            done(null, false);
            return;
        }

        const isMatch = await user.isPasswordValid(password);

        if (!isMatch) {
            done(null, false);
            return;
        }

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));