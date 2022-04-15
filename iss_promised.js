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
    .then(ip => fetchCoordsByIP(JSON.parse(ip).ip))
    .then(coords => fetchISSFlyOverTimes({latitude: JSON.parse(coords).latitude, longitude: JSON.parse(coords).longitude}))
    .then(flyOverTimes => {
      const { response } = JSON.parse(flyOverTimes);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };