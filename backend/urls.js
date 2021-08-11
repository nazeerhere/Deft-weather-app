const express = require("express")
const router = express.Router()
const axios = require("axios")

const locations = require("./models/location-model")

router.get("/history", async (req, res, next) => {
    try {
        const location = await locations.find({})
        res.json(location)
    } catch(err) {
        next(err)
    }
})

router.post("/history", (req, res, next) => {

    try {
        const newLoc = locations.create(req.body)
        let data = ""

        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=t9EfppOfT3Hm81oPjoj1OoAieF6JGGAV&q=chicago`)
        .then(res2 => {
            data = res2.data
            console.log(res2)
        })
        .then(_ => {
            res.json({
                Location: req.body,
                message: `good work!!`,
                data: data
            })
        })
        
        console.log("something happening")
        console.log(req.body)

    } catch(err) {
        next(err)
    }
})

module.exports = router