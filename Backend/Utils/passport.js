import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJwt } from "passport-jwt";
import passport from "passport";
import Users from "../models/UserModel.js";
import config from "../configs/config.js";
import {mongoose} from "mongoose";

const jwt_secret = "cmpe273_secret_key";

export function auth() { 
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: jwt_secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const user_id = jwt_payload._id;
      const email = jwt_payload.email;
      Users.findOne({email:email}, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    })
  );
}

export const checkAuth = passport.authenticate("jwt", { session: false });
