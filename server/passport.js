const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./pool");

exports.setup = (app) => {
  app.use(
    session({
      secret: "supersecretkey",
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    pool.query(
      "SELECT id, t_name_user FROM users WHERE id=$1",
      [parseInt(id, 10)],
      (err, result) => {
        if (err) return done(err);

        const user = result.rows[0];
        done(null, user); //*
      }
    );
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        //*
        pool.query(
          "SELECT id, t_name_user, t_email, t_password FROM users where t_email=$1",
          [email],
          (err, result) => {
            if (err) done(err);
            if (result.rows.length > 0) {
              const first = result.rows[0];
              bcrypt.compare(password, first.t_password, (err, res) => {
                if (res) done(null, { id: first.id });
                else {
                  done(null, false);
                }
              });
            }
          }
        );
      }
    )
  );
};
