import passport from 'passport';
import { UserModel } from '../DAO/models/users.model.js';
import fetch from 'node-fetch';
import GitHubStrategy from 'passport-github2';
import jwt from 'passport-jwt';
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

function cookieExtractor(req) {
  console.log('hola');
  let token = null;

  if (req?.cookies?.token) {
    token = req.cookies.token;
  }
  console.log('token', token);
  return token;
}

export function iniPassport() {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderSecret',
      },
      async (jwt_payload, done) => {
        console.log(jwt_payload);
        try {
          return done(null, jwt_payload);
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}
