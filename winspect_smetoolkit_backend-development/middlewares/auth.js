const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { models } = require('../database/index');
const { debugLog } = require('../helpers/loggers');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_ACCESS_TOKEN,
};

passport.use(
  'jwt',
  new JwtStrategy(options, async ({ id, email }, done) => {
    try {
      const smeUser = await models.sme_user.findOne({
        where: { smeUserId: id, isActive: 1 },
      });

      let userTokenData = {};

      if (smeUser) {
        userTokenData = {
          id: smeUser.smeUserId,
          email,
          isSuperAdmin: smeUser.isSuperAdmin,
        };
      }

      debugLog('sme_user_info:', `id:${id}, name:${smeUser.first}, email:${smeUser.email}`);
      return done(null, userTokenData);
    } catch (error) {
      return done({ status: 500, code: 'TOKEN_INVALID' }, null);
    }
  })
);

const jwtMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, _) => {
    if (error || !user) {
      return res.status(401).send({
        error: {
          code: 'NOT_AUTHORIZED',
        },
      });
    }
    req.smeUser = user;
    return next();
  })(req, res, next);
};

module.exports = {
  jwtMiddleware,
};
