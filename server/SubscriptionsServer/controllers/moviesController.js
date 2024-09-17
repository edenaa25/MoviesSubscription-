const express = require("express")
const router = express.Router()
const moviesService = require("../services/moviesService")
const subService = require("../services/subscriptionsService")


router.get("/", async (req, res) => {
    try {
        const movies = await moviesService.getAllMovies()
        return res.json(movies)

    } catch (e) {
        return { error: e.message }
    }
})


router.get("/:id", async(req, res)=>{
    try{
        const id = req.params.id
        const movie = await moviesService.getMovieById(id)
        return res.json(movie)
    }
    catch (e) {
        return { error: e.message }
    }
})

//get subs by movie id from sub service
router.get("/subscriptions/:id", async(req, res)=>{
    try{
        const id = req.params.id //movie id
        const subs = await subService.allSubByMovieId(id)
        return res.json(subs)
    }
    catch (e) {
        return { error: e.message }
    }
})

router.post("/", async (req, res)=>{
    try{
        const newMovie = req.body
        const status = await moviesService.createMovie(newMovie)
        return res.json({status})
    } catch (e) {
        return { error: e.message }
    }
    
})

router.put("/:id" , async(req, res)=>{
    try{
        const id = req.params.id
        const newData = req.body
        const status = await moviesService.updateMovie(id,newData)
        return res.json({status})
    }
    catch (e) {
        return { error: e.message }
    }
})

router.delete("/:id", async(req, res)=>{
    try{
        const id = req.params.id
        const status = await moviesService.deleteMovie(id)
        return res.json({status})
    }
    catch (e) {
        return { error: e.message }
    }

})

module.exports = router


