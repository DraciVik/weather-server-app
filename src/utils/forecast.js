const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/2c888f7727c039b1e000674d21708f3a/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    const { error: locationError } = body;
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (locationError) {
      callback("Unable to find location");
    } else {
      const { summary, temperature, precipProbability } = body.currently;

      const { temperatureHigh, temperatureLow } = body.daily.data[0];
      callback(
        undefined,
        `${summary}. The temperature currently is ${temperature} celsius and there is currently ${precipProbability}% chance of rain.
        The temperature low today is ${temperatureLow} celsius and the temperature high today is ${temperatureHigh} celsius`
      );
    }
  });
};

module.exports = forecast;
