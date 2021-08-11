const express = require("express")
const app = express()
const router = require("./urls")
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ entended: true }));
app.use(cors());

app.use("/", router)

app.get("/", (req, res) => {
    res.send("Weather app backend - Home page")
})

app.set("port", process.env.PORT || 3001)

app.listen(app.get("port"), () => {
    console.log(
        `🍎 is running on port ➡️ http://localhost:${app.get("port")} 🌟`
    )
})