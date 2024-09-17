const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');
const checkPermissions = require('../Middleware/checkPermissions') 

// Get all users with their permissions
router.get('/', checkPermissions([]), async (req, res) => {
    try {
        const usersWithPermissions = await usersService.getAllUsersWithPermissions();
        res.status(200).json(usersWithPermissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', checkPermissions([]), async (req, res) => {
    try {
        const newData = req.body
        const id = req.params.id 

        const updateUser= await usersService.editUser(id,newData)

        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', checkPermissions([]), async (req, res) => {
    try {
        const newData = req.body
        const addUser = await usersService.addUser(newData)
        res.status(200).json(addUser);
    } catch (error) {
        if (error.message === 'Username already exists, please try another one') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Server error, could not add user' });
        }
    }
});

router.delete('/:id', checkPermissions([]), async(req,res)=>{
    const id = req.params.id 
    try{
        const deleteUser = await usersService.deleteUser(id)
        res.status(200).json(deleteUser);

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

})

module.exports = router;