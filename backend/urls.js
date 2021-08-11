const express = require("express")
const router = express.Router()

const locations = require("./models/location-model")

router.get("/history", async (req, res, next) => {
    try {
        const location = await locations.find({})
        res.json(location)
    }
    catch(err) {
        next(err)
    }
})

module.exports = router