const functions = require("firebase-functions");
const path = require("path");

// exports.app = functions.https.onRequest(expressApp);
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

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(compression());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.listen(3000, () => {
  console.log("Listening to PORT 3000");
});

/**
 * Routes
 */
// GET home page.
app.get("/", (req, res, next) => {
  res.render("index");
});
// GET history page.
app.get("/history", (req, res, next) => {
  res.render("history");
});
// GET projects page.
app.get("/projects", (req, res, next) => {
  res.render("projects");
});
// GET contact form page.
app.get("/contact-us", (req, res, next) => {
  res.render("contactform");
});
app.use("/form-submission", formSubmissionRouter);
app.use("/form-success", formSuccessRouter);
app.use("/form-failure", formFailureRouter);

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
