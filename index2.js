const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = (passTimes) => {
  for (const passes of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passes.risetime);
    console.log(`Next pass at ${datetime} for ${passes.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });