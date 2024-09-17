const express = require("express")
const router = express.Router()
const memberService = require("../services/membersService")

router.get("/", async (req, res) => {
    try {
        const members = await memberService.getAllMembers()
        return res.json(members)
    } catch (e) {
        return { error: e.message }
    }

})

//get movies that the member subscribe to by member id
router.get("/subscribe/:id", async (req, res) => {
    try {
        const id= req.params.id
        const movies = await memberService.getMoviesSubByMemberId(id)
        return res.json(movies) //Movies : [{movieId:String ,date: Date} ]
    } catch (e) {
        return { error: e.message }
    }
})


router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const member = await memberService.getMemberById(id)
        return res.json(member)
    } catch (e) {
        return { error: e.message }
    }
})

router.post("/", async (req, res) => {
    try{
        const member = req.body
        const status = await memberService.newMember(member)
        return res.json({ status })
    } catch (e) {
        return { error: e.message }
    }
})

router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const newData = req.body
        const status = await memberService.updateMember(id, newData)
        return res.json({ status })
    }catch (e) {
        return { error: e.message }
    }
    
})

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const status = await memberService.deleteMember(id)
        return res.json({ status })
    }catch (e) {
        return { error: e.message }
    }
})

module.exports = router