const express = require("express")
const userAddress = require("../models/address")
const axios = require("axios")

const router = express.Router()
router.get("/", (req, res) => {
    res.status(200).send(`home page`)
});

router.post("/getaddress", async (req, res) => {
    try {
        let address = req.query.address
        let resp = axios({
            method: "get",
            url: `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=GG2R8NBQWBI9PSSNY3Y343FBCU4SB8Z84R`,
        })
        let response = await resp

        // console.log(response.data.result[0].to)
        userAddress.create({ transactions: req.body }).then((userdata) => {
            res.status(200).send(userdata);
        })
    }
    catch (err) {
        // console.log(err);
        res.status(400).send(err)
    }
});

module.exports = router;