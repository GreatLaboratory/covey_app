const FacebookStrategy = require('passport-facebook').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret : process.env.FACEBOOK_SECRET,
        callbackURL: "/api/auth/facebook/callback"
    }, async (accessToken, refreshToken, profile, done)=>{
        try {
            console.log("facebook 로그인 전락 수행 시작");
            const exUser = await User.findOne({ where : { snsId: profile.id } });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile.email,  // email은 이렇게 받아오는게 맞는지 물어봐야할 듯
                    name : profile.displayName,
                    snsId: profile.id
                });
                done(null, newUser);
            }
        } catch (e) {
            console.error(e);
            done(e);
        }
    }))
};