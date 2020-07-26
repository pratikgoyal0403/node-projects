const mongoose = require("mongoose");
const Contact = require("../model/contact");

exports.getContacts = (req, res, next) => {
  const userId = req.params.userId;
  Contact.find({userId: userId})
    .then((contacts) => {
      if (!contacts) {
        return res.status(404).json({ message: "no contacts found" });
      }
      return res
        .status(200)
        .json({ message: "contacts fetched sucessfully", contacts: contacts });
    })
    .catch((err) => console.log(err));
};

exports.postContact = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const type = req.body.type;
  const userId = req.params.userId;
  const contact = new Contact({
    name: name,
    email: email,
    phone: phone,
    contactType: type,
    userId: userId
  });
  contact
    .save()
    .then((result) => {
      res.status(201).json({ message: "contact Saved", contact: result });
    })
    .catch((err) => console.log(err));
};

exports.updateContact = (req, res, next) => {
  const userId = req.params.userId;
  const id = req.query.contactId;
  console.log(id);
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const type = req.body.type;
  Contact.findById(id)
    .then((contact) => {
      console.log(contact);
      if (!contact) {
        return res.status(404).json({ message: "contact not found" });
      }
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      contact.type = type;
      return contact.save();
    })
    .then((result) => {
      return res
        .status(201)
        .json({ message: "contact updated sucessfully", contact: result });
    })
    .catch((err) => console.log(err));
};

exports.deleteContact = (req, res, next)=>{
  const userId = req.params.userId;
  const id = req.query.contactId;
  Contact.findByIdAndRemove(id).then(result=>{
    console.log(result);
    res.status(201).json({message: 'contact deleted sucessfully', contact: result});
  }).catch(err=>console.log(err));
}