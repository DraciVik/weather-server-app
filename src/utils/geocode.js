const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZHJhY2l2aWsiLCJhIjoiY2s3cXgxYmNnMDZxMDNlcDQ1dHkxM2pmbyJ9.EAadE50yKDmu9fCC666j2A&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    const { length } = body.features;
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
