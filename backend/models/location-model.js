const mongoose = require("../db/connection")

const locationSchema = new mongoose.Schema(
    {
        Location: String
    }
)
module.exports = mongoose.model("user", locationSchema)