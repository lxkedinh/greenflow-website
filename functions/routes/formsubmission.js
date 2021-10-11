let express = require("express");
const functions = require("firebase-functions");
let router = express.Router();
require("dotenv").config();

// MailJet API Keys
const mailjet = require("node-mailjet").connect(
  // process.env.MAILJET_PUBLIC,
  // process.env.MAILJET_SECRET
  `${functions.config().mailjetpublic.key}`,
  `${functions.config().mailjetsecret.key}`
);

// POST form submission page.
router.post("/", function (req, res, next) {
  /**
   * Send an e-mail message to ourselves with name, contact info, and message of user who submitted HTML form on website
   */
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        /**
         * TODO: replace with official greenflowhvac email later after Namecheap email is set up
         */
        From: {
          Email: "lukexdinh@gmail.com",
          Name: `${req.body.firstName} ${req.body.lastName}`,
        },
        To: [
          {
            Email: "lukexdinh@gmail.com",
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
    .then((result) => {
      // console.log(result.body);
      res.redirect("/app/form-success");
    })
    .catch((err) => {
      // console.log(err);
      res.redirect("/app/form-failure");
    });
});

module.exports = router;
