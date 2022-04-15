const request = require('request');

// Function to fetch current IP address using ipify API.
const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // If API does not return a successful connection return the status code.
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // Data is returned as JSON and needs to be converted into an object before we can extract the information
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
    
  });
};

// Function to fetch current geo-coordinates based on FreeGeoIP API.
const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=fb38de50-bc4f-11ec-9a25-bb7043f81955`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // If API does not return a successful connection return the status code.
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // Data is returned as JSON and needs to be converted into an object before we can extract the information
    const { latitude, longitude } = JSON.parse(body);
    return callback(null, { latitude, longitude });
  });
  
};

// Function to fetch current ISS times based on deprecated API. Requires coordiantes and will return time based from epoc.
const fetchISSFlyOverTimes = ({ latitude, longitude }, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyOverTimes = JSON.parse(body).response;
    return callback(null, flyOverTimes);
  });

};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, flyOverTimes);
      });
    });
  });
  
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
