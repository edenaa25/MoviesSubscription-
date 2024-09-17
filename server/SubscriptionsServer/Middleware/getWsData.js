const memberService = require("../services/membersService")
const moviesService = require("../services/moviesService")

const saveDataToDB = async()=>{
    try{
        await memberService.saveMembersToDB()
        await moviesService.saveMoviesToDB()
        
    } catch (e) {
        return { error: e.message }
    }
   
}

module.exports = { saveDataToDB };
