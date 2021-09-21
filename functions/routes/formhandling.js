let express = require("express");
let formSuccessRouter = express.Router();
let formFailureRouter = express.Router();

// GET form submission success page.
formSuccessRouter.get("/", (req, res, next) => {
  res.render("formresponse", {
    title: "Greenflow HVAC - Contact Us Form Success",
    response: "Your message was successfully sent to our consultant!"
  });
});

// GET form submission failure page.
formFailureRouter.get("/", (req, res, next) => {
    res.render("formresponse", {
        title: "Greenflow HVAC - Contact Form Failure",
        response: "Something went wrong with your contact form submission. Please try again."
    });
});

module.exports = {
    formSuccessRouter,
    formFailureRouter
};
