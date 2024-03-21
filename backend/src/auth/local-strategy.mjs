import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../database/schemas/user.mjs";
import { comparePassword } from "../utils/hash.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      throw new Error("User not found");
    }
    done(null, foundUser);
  } catch {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username });
      if (!foundUser) {
        throw new Error("User not found");
      }
      if (!comparePassword(password, foundUser.password)) {
        throw new Error("Incorrect password");
      }
      done(null, foundUser);
    } catch (err) {
      done(err, null);
    }
  })
);
