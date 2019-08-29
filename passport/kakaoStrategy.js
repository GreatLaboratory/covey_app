const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: "/api/auth/kakao/callback"   // 맨 앞에 /(슬래쉬) 안붙혔다고 에러 이틀동안 고생함....
    }, async (accessToken, refreshToken, profile, done)=>{
        try {
            console.log("kakao 로그인 전락 수행 시작");
            const exUser = await User.findOne({ where : { snsId: profile.id } });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kaccount_email,
                    name : profile.displayName,
                    snsId: profile.id
                });
                done(null, newUser);
            }
        } catch (e) {
            console.error(e);
            done(e);
        }
    }));
};