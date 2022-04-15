const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('75.157.109.252', (error, coords) => {
//   if (error) {
//     console.log("Something went wrong: ", error);
//     return;
//   }

//   console.log("Co-ordinate fetching worked. As follows: ", coords);
// });


// fetchISSFlyOverTimes({ latitude: 49.2526, longitude: -123.1236 }, (error, flyOverTimes) => {
//   if (error) {
//     console.log("Something went wrong: ", error);
//     return;
//   }

//   console.log("ISS Flyover times successfully fetched. As follows: ", flyOverTimes);
// });


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
  for (const passes of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passes.risetime);
    console.log(`Next pass at ${datetime} for ${passes.duration} seconds!`);
  }

});

