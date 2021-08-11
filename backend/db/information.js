const Location = require("../models/location-model");

const seedData = require("./filler.json");

Location.deleteMany({})
.then(() => {
    return Location.insertMany(seedData)
})
.then(console.log)
.catch(console.error)
.finally(() => process.exit());



