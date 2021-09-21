let express = require("express");
const functions = require("firebase-functions");
let router = express.Router();

// MailJet API Keys
const mailjet = require("node-mailjet").connect(
  // process.env.MJ_PUBLIC_KEY,
  // process.env.MJ_SECRET_KEY
  "cae65c9d7f8d128906ca553160e0543a",
  "c17ce41bd8566e579c6a326d0461e124"
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
      res.redirect("/form-success");
    })
    .catch((err) => {
      // console.log(err);
      res.redirect("/form-failure");
    });
});

module.exports = router;
