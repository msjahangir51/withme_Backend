const passport = require("passport");

const Auth = passport.authenticate('jwt', { session: false });


module.exports ={Auth}