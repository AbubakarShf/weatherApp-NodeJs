const request = require("request")

const getGeolocation = (address, callBack) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWJ1YmFrYXJzaGYiLCJhIjoiY2w2aGRneDJiMHpqMDNib2F5cWc1cTRycCJ9.PDrPiFyv-l-egz9eUZ-1qQ"

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callBack("unable to connect location service", undefined)
    } else if (body.features.length === 0) {
      callBack("unable to find location", undefined)
    } else {
      callBack(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      })
    }
  })
}

module.exports = {
  getGeolocation,
}
