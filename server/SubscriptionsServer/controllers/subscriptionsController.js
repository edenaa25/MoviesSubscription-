const express = require("express")
const router = express.Router()
const subscriptionsService = require("../services/subscriptionsService")


router.put("/:id",async (req, res)=>{
    try{
        const id= req.params.id
        const newSub = req.body
        const status = await subscriptionsService.addOrUpdateSubscription(id,newSub)
        return res.json({status})
    }catch (e) {
        return { error: e.message }
    }
})

module.exports = router