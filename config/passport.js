import bcrypt from "bcryptjs";
import passport from "passport";
import LocalStrategy from "passport-local";
import { prisma } from "../lib/prisma.js";

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) return done(null, false);

      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) return done(null, user);
      else return done(null, false);
    } catch (err) {
      done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
