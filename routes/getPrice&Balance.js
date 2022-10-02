const express = require("express")
const axios = require("axios")

const router = express.Router()
router.get("/getPrice&Balance", async (req, res) => {
    let resp = axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr")
    let currPrice = await resp
    let address = req.query.address
    let resp2 = axios({
        method: "get",
        url: `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=GG2R8NBQWBI9PSSNY3Y343FBCU4SB8Z84R`
    })
    let response = await resp2
    let val = response.data.result
    let userBalance = 0
    for (Each of val) {
        if (address == Each.to) {
            userBalance += parseInt(Each.value)
        } else {
            userBalance -= parseInt(Each.value)
        }
    }
    res.status(200).send(`current price is ${currPrice.data.ethereum.inr} & current Balance is ${userBalance}`)
})
module.exports = router;