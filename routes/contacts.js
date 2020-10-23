const express = require('express');
const passport = require('passport');
const ContactsService = require('../services/contacts');

//Basic strategy

require('../utils/auth/strategies/jwt');

function contactsApi(app) {
  const router = express.Router();
  app.use('/api/contacts', router);

  const contactsService = new ContactsService();

  router.get('/contact/:id', passport.authenticate('jwt', {session: false}), async function (
    req,
    res,
    next,
  ) {
    try {
      const user = await contactsService.getContact({id: req.params.id});
      res.status(200).json({
        data: user,
        message: 'contact listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:user_id', passport.authenticate('jwt', {session: false}), async function (
    req,
    res,
    next,
  ) {
    try {
      const currentPage = req.query.page;

      const {contacts, totalCount} = await contactsService.getContacts({
        user_id: req.params.user_id,
        page: currentPage,
      });
      let totalPages = Math.trunc(totalCount / 10);
      let lastPage = totalCount % 10 > 0 ? totalPages + 1 : totalPages;

      res.status(200).json({
        data: contacts,
        message: 'contacts listed',
        pagination: {
          last_page: lastPage,
          current_page: parseInt(currentPage) || 1,
        },
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/create', passport.authenticate('jwt', {session: false}), async function (
    req,
    res,
    next,
  ) {
    const {body: contact} = req;

    try {
      const contactResult = await contactsService.createContact(contact);

      res.status(201).json({
        data: contactResult,
        message: 'contacts created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/update/:id', passport.authenticate('jwt', {session: false}), async function (
    req,
    res,
    next,
  ) {
    const {body: contact} = req;

    try {
      const contactResult = await contactsService.updateContact(contact, req.params.id);

      res.status(200).json({
        data: contactResult,
        message: 'contacts updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), async function (
    req,
    res,
    next,
  ) {
    try {
      const contactResult = await contactsService.deleteContact({id: req.params.id});

      res.status(200).json({
        data: contactResult,
        message: 'contacts removed',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = contactsApi;
