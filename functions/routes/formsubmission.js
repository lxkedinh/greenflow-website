let express = require("express");
const functions = require("firebase-functions");
const { body } = require("express-validator");
let router = express.Router();
require("dotenv").config();

// MailJet API Keys
const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_PUBLIC,
  process.env.MAILJET_SECRET
);

// POST form submission page.
router.post(
  "/",
  [
    body("firstName").trim().escape(),
    body("lastName").trim().escape(),
    body("phone").trim().escape(),
    body("email").trim().isEmail().normalizeEmail().escape(),
    body("message").trim().escape(),
  ],
  function (req, res) {
    /**
     * Send an e-mail message with name, contact info, and message of user who submitted HTML form on website
     */
    console.log(req.body);

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL,
            Name: `${req.body.firstName} ${req.body.lastName}`,
          },
          To: [
            {
              Email: process.env.EMAIL,
              Name: "Greenflow HVAC Website",
            },
          ],
          Subject: "Greenflow HVAC Contact Form Request",
          TextPart: `From ${req.body.firstName} ${req.body.lastName} at ${req.body.email} or ${req.body.phone},
          ${req.body.message}`,
          HTMLPart: `Greenflow HVAC Contact Form Request</h3>
            <p>From ${req.body.firstName} ${req.body.lastName} at ${req.body.email} or ${req.body.phone},</p><br /><br />
            <p>${req.body.message}`,
        },
      ],
    });

    request
      .then(() => {
        res.redirect("/form-success");
      })
      .catch(() => {
        res.redirect("/form-failure");
      });
  }
);

module.exports = router;
