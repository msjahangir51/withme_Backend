const passport = require('passport');
const { SECRET_KEY } = require('./secret');
const { UserModel } = require('../models/user.model');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;
passport.use(new JwtStrategy(opts, async(jwt_payload, done)=> {
    try {
        const user = await UserModel.findOne({_id:jwt_payload.id});
        if(user){
            return done(null, user)
        }else{
            return done(null,false)
        }

    } catch (error) {
        return done(error,false)        
    }
}));