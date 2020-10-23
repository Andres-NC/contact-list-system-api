const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const UsersService = require('../services/users');

const {config} = require('../config');

//Basic strategy

require('../utils/auth/strategies/basic');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const usersService = new UsersService();

  router.post('/login', async function (req, res, next) {
    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, {session: false}, async function (error) {
          if (error) {
            next(error);
          }

          const {name, email, id} = user;

          const payload = {
            name,
            email,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '55m',
          });

          return res.status(200).json({token, user: {name, email, id}});
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', async function (req, res, next) {
    const {body: user} = req;
    try {
      const userCreated = await usersService.createUser({user});
      res.status(201).json({
        data: userCreated,
        message: 'user created',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = usersApi;
