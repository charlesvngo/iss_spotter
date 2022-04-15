const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (ip) => {
  return request(`https://api.freegeoip.app/json/${ip}?apikey=fb38de50-bc4f-11ec-9a25-bb7043f81955`);
};

const fetchISSFlyOverTimes = ({ latitude, longitude }) => {
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(body => fetchCoordsByIP(JSON.parse(body).ip))
    .then(body => fetchISSFlyOverTimes({latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).longitude}))
    .then(body => {
      const { response } = JSON.parse(body);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };