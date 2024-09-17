const express = require('express');
const router = express.Router();
const axios = require('axios');
const checkPermissions = require('../Middleware/checkPermissions') 

const SubscriptionsServer_URL = 'http://localhost:8000'

router.get('/',checkPermissions(['View Movies']), async (req, res) => {
    try {
        const response = await axios.get(`${SubscriptionsServer_URL}/movies`)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/:id',checkPermissions(['View Movies']), async (req, res) => {
    const { id } = req.params
    try {
        const response = await axios.get(`${SubscriptionsServer_URL}/movies/${id}`)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//get all subs by movie id , return a list of: { MemberId:, MemberName: , Date:}
router.get('/subscriptions/:id',checkPermissions(['View Movies']), async (req, res) => {
    const { id } = req.params
    try {
        const response = await axios.get(`${SubscriptionsServer_URL}/movies/subscriptions/${id}`)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.post('/',checkPermissions(['Create Movies']), async (req, res) => {
    const newMovie = req.body
    try {
        const response = await axios.post(`${SubscriptionsServer_URL}/movies`, newMovie)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.put('/:id',checkPermissions(['Edit Movies']), async (req, res) => {
    const { id } = req.params
    const movieData = req.body
    try {
        const response = await axios.put(`${SubscriptionsServer_URL}/movies/${id}`, movieData)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.delete('/:id',checkPermissions(['Delete Movies']), async (req, res) => {
    const { id } = req.params
    try {
        const response = await axios.delete(`${SubscriptionsServer_URL}/movies/${id}`)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = router;