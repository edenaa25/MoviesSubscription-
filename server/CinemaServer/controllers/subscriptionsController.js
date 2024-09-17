const express = require('express');
const router = express.Router();
const axios = require('axios');
const checkPermissions = require('../Middleware/checkPermissions') 

const SubscriptionsServer_URL = 'http://localhost:8000'

router.get('/',checkPermissions(['View Subscriptions']), async (req, res) => {
    try {
        const response = await axios.get(`${SubscriptionsServer_URL}/members`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id',checkPermissions(['View Subscriptions']), async (req, res) => {
    const { id } = req.params
    try {
        const response = await axios.get(`${SubscriptionsServer_URL}/members/${id}`)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//get all subs of a member by member id - {movieId, date, memberId, Name}
router.get('/subscribe/:id',checkPermissions(['View Subscriptions']), async (req, res) => {
    const { id } = req.params; 
    try {
        const response = await axios.get(`${SubscriptionsServer_URL}/members/subscribe/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//add subscribe to a member by member id - work
//{ "date" : "11.10.1996", "movieId" : "66991ad7d66f9b91aaeec44a" }
router.put('/subscribe/:id',checkPermissions(['Edit Subscriptions']), async (req, res) => {
    const { id } = req.params; 
    const newSub = req.body
    try {
        const response = await axios.put(`${SubscriptionsServer_URL}/subscriptions/${id}`, newSub);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/',checkPermissions(['Create Subscriptions']), async (req, res) => {
    const newMember = req.body
    try {
        const response = await axios.post(`${SubscriptionsServer_URL}/members`, newMember);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id',checkPermissions(['Edit Subscriptions']), async (req, res) => {
    const { id } = req.params;
    const memberData = req.body
    try {
        const response = await axios.put(`${SubscriptionsServer_URL}/members/${id}`, memberData);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id',checkPermissions(['Delete Subscriptions']), async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.delete(`${SubscriptionsServer_URL}/members/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;