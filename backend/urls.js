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

    let prototype = {
        date: "",
        Temp: {
            min: {},
            max: {}
        } ,
        Day: {
            Icon: 0,
            IconPhrase: "",
            HasProcipitation: Boolean
        },
        Night: {
            Icon: 0,
            IconPhrase: "",
            HasProcipitation: Boolean
        }
    }

    try {
        const newLoc = locations.create(req.body)
        let data = []
        let arr = []

        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=t9EfppOfT3Hm81oPjoj1OoAieF6JGGAV&q=${req.body.Location}`)
        .then(res2 => {
            console.log(res2.data[0].Key)
            
            axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${res2.data[0].Key}?apikey=t9EfppOfT3Hm81oPjoj1OoAieF6JGGAV`)
            .then(res3 => {
                data = res3.data.DailyForecasts
                console.log(data.length)
                console.log(data)

                for(let i = 0; i<data.length; i++) {
                    prototype = {
                        date: data[i].Date,
                        Temp: {
                            min: data[i].Temperature.Minimum,
                            max: data[i].Temperature.Maximum
                        } ,
                        Day: {
                            Icon: data[i].Day.Icon,
                            IconPhrase: data[i].Day.IconPhrase,
                            HasProcipitation: data[i].Day.HasPrecipitation
                        },
                        Night: {
                            Icon: data[i].Night.IconPhrase,
                            IconPhrase: data[i].Night.IconPhrase,
                            HasProcipitation: data[i].Night.HasPrecipitation
                        }
                    }

                    console.log(prototype)
                    arr.push(prototype)
                }
            })

            setTimeout(() => {
                
                res.json({
                    Location: req.body,
                    message: `good work!!`,
                    data: arr
                })
            }, 500);
        })
        
        setTimeout(() => {
            console.log(arr)
        }, 500);
        console.log("something happening")
        console.log(req.body)

    } catch(err) {
        next(err)
    }
})

module.exports = router