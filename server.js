const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const getAddress = require("./routes/getAddress")
const getPriceBalance = require("./routes/getPrice&Balance")
const priceDetails = require("./models/price")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use("/", getAddress);
app.use("/", getPriceBalance);

let port = process.env.PORT || 3000
app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server started running at port ${port}`)
    }
});

const mongoDB = process.env.DB
mongoose.connect(mongoDB, () => {
    console.log(`MongoDB connected succesfully`)
}, (err) => {
    console.log(err)
});

let getPrice = () => {
    let resp = axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr").then((data) => {
        let price = data
        // console.log(price.data)
        let today = new Date()
        let time = `${today.getHours()}:${today.getMinutes()}`
        priceDetails.create({ price: price.data.ethereum.inr, time: time }).then((data) => {
            // console.log(data)
            return data
        }).catch((err) => {
            return err
        })
    })
}
setInterval(getPrice, 1000 * 600)