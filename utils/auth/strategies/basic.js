const passport = require('passport');
const {BasicStrategy} = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/users');

passport.use(
  new BasicStrategy(async function (email, password, cb) {
    console.log('strategy', email);
    const userService = new UserService();
    try {
      const user = await userService.getUser({email});
      console.log(user);
      if (!user) {
        return cb(boom.unauthorized(), true);
      }
      console.log(await bcrypt.compare(password, user.password));
      if (!(await bcrypt.compare(password, user.password))) {
        console.log('no password');
        return cb(boom.unauthorized(), true);
      }

      delete user.password;
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }),
);
