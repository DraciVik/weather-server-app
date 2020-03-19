const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Viktor Stojanov"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Viktor Stojanov"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Wash your hands",
    title: "Help",
    name: "Viktor Stojanov"
  });
});

// route as first argument, second argument is a callback function describing what to send based on the route
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must proivde a valid search address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          });
        }
        return res.send({
          forecast: forecastData,
          address: req.query.address,
          location
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  return res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Viktor Stojanov"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",

    name: "Viktor Stojanov"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
