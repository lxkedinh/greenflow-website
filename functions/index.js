const functions = require("firebase-functions");
const path = require("path");

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const compression = require("compression");
const helmet = require("helmet");

/**
 * Routers
 */
const formSubmissionRouter = require(path.join(
  __dirname,
  "./routes/formsubmission"
));

const { formSuccessRouter, formFailureRouter } = require(path.join(
  __dirname,
  "./routes/formhandling"
));

// view engine and serve public ejs, css, and javascripts from Firebase Hosting site
app.set("views", path.join(__dirname, ".", "api-static-resources", "views"));
app.use(express.static(path.join(__dirname, ".", "api-static-resources")));
app.set("view engine", "ejs");

app.use(compression());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// trusted sources for Content Security Policy HTTP Headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "https://code.jquery.com"],
    },
  })
);

let hostingDomain = "https://greenflow-hvac.web.app";
/**
 * Routes
 */
// GET home page.
app.get("/", (req, res, next) => {
  res.redirect(hostingDomain + "/");
});
// GET history page.
app.get("/history", (req, res, next) => {
  res.redirect(hostingDomain + "/history");
});
// GET projects page.
app.get("/projects", (req, res, next) => {
  res.redirect(hostingDomain + "/projects");
});
// GET resources page.
app.get("/resources", (req, res, next) => {
  res.redirect(hostingDomain + "/resources");
});
// GET contact form page.
app.get("/contact-us", (req, res, next) => {
  res.render("contactform");
});
app.use("/form-submission", formSubmissionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

exports.app = functions.https.onRequest(app);
