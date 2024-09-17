const express = require('express');
const { generateToken } = require('../utils/jwt');
const usersService = require('../services/usersService');
const usersDbService = require('../services/usersDbService');
const permissionsService = require('../services/permissionsService')

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await usersDbService.userLogIn(username, password)
        const userId = user._id?.toString()
        if (user.error) {
            console.log(user.error)
            return res.status(401).json({ message: user.error });
        }
        //decode user SessionTimeOut + name for token data
        const userData = await usersService.getUserById(userId)
        
        if (!userData) {
            return res.status(404).json({ message: 'User data not found in Users file' });
        }
        const expiresIn = userData.SessionTimeOut * 60; // Convert minutes to seconds
        const userFullName = `${userData.Fname} ${userData.Lname}`

        //get user permissions 
        const userPermissions = await permissionsService.getUserPermissions(userId)

        //check if the user is admin
        const adminId = await usersService.getAdminUserId()
        const isAdmin = adminId === userId

        const token = generateToken({ id: user._id, name: userFullName, permissions: userPermissions, isAdmin}, expiresIn);

        res.json({
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
});

router.put('/',async (req,res)=>{
    const { username, password } = req.body
    try{
        const addUser = await usersDbService.newUser(username, password)
        if (addUser.error) {
            return res.status(401).json({ message: addUser.error })
        }

        return res.json({ message: addUser }) 

    }catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
})

module.exports = router;