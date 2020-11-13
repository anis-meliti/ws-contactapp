const express = require('express');
const { check, validationResult } = require('express-validator');
const Contact = require('../model/Contact');

const Router = express.Router();

Router.post(
  `/addContact`,
  [
    check('name', 'name is required !!!').notEmpty(),
    check('email', 'email is required !!!').notEmpty(),
    check('email', 'email should be a valid email!!!').isEmail(),
  ],
  async (req, res) => {
    console.log('req', req.body);

    const errors = validationResult(req);
    console.log('errors', errors.array());
    if (!errors.isEmpty()) return res.json({ errors: errors.array() });

    const { name, email, phoneNumber } = req.body;
    try {
      const searchResult = await Contact.findOne({ email });
      console.log('searchResult', searchResult);
      if (searchResult) return res.json({ msg: `contact already exist!` });
      const newContact = new Contact({
        name,
        email,
        phoneNumber,
      });
      newContact.save();
      res.json(newContact);
    } catch (error) {
      console.error(errors);
      res.json(error);
    }
  }
);

Router.get(`/getAllContact`, async (req, res) => {
  try {
    const allContact = await Contact.find();
    res.json(allContact);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});
Router.delete('/deleteContact/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.deleteOne({ _id: id });
    res.json(`Contact deleted :) `);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});
Router.post('/editContact/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber } = req.body;

  try {
    const editedContact = {
      name,
      email,
      phoneNumber,
    };
    const editRes = await Contact.findByIdAndUpdate(id, editedContact);
    res.json(editRes);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});
module.exports = Router;
