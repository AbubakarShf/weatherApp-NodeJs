const express = require("express")
const path = require("path")
const request = require("request");
const hbs = require("hbs")
const geoLocation = require("./utils/geoLocation")
const weather = require("./utils/forecast")

const app = express()

const publicDirectory = path.join(__dirname, "../public")
const viewDirectory = path.join(__dirname, "../templates/views/")
const partialDirectory = path.join(__dirname, "../templates/partials/")

app.use(express.static(publicDirectory))

app.set("view engine", "hbs")
app.set("views", viewDirectory)
hbs.registerPartials(partialDirectory)

app.get("/", (req, resp) => {
  resp.render("index", { title: "Home" })
})

app.get("/about", (req, resp) => {
  resp.render("about", { title: "AboutUs" })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    })
  }
  geoLocation.getGeolocation(
    encodeURIComponent(req.query.address),
    (error, { latitude, longitude } = {}) => {
      if (error === undefined) {
        weather.forecast(
          latitude,
          longitude,
          (error, { lat, lon, location, weather } = {}) => {
            if (error === undefined) {
              console.log(location, lat, lon, weather)
              res.send({
                location,
                lat,
                lon,
                weather,
              })
            } else {
              res.send({ error })
            }
          }
        )
      } else {
        res.send({ error })
      }
    }
  )
})
app.get("/help/*", (req, resp) => {
  resp.render("404help", { title: "NotFound", Message: "help Page NotFound" })
})
app.get("*", (req, resp) => {
  resp.render("404page", {
    title: "NotFound",
    Message: "404 Error | Page Not Found",
  })
})

app.listen(8080, () => console.log("listening on port 8080"))
