const mongoose = require("mongoose");


const mongoURI =
    process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : 'mongodb://localhost:27017/';

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(instance => {
        console.log(`🔸 Connected to db: 🛠️ ${instance.connections[0].name}`)
        // console.log(instance.connections)
    })
    .catch(err => console.log(`Connection to db failed due to ${err}`))

module.exports = mongoose;