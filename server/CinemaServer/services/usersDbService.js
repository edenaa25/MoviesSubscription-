const usersModel = require("../models/usersModel");

const userLogIn = async (username,password)=>{
    try {
        const user = await usersModel.findOne({ UserName: username });
        if (!user) {
            return { error: 'Invalid username' };
        }

        if (user.Password !== password) {
            return { error: 'Invalid password' };
        }

        if (user.Password === '') {
            return { error: 'No password defined - Click on create accounte' };
        }

        return user;
    } catch (error) {
        console.error('Error during user login:', error);
        return { error: 'An error occurred during login' };
    }
}

const newUser = async (username, password) => {
    try {
        const user = await usersModel.findOne({ UserName: username });
        if(user && user?.Password){
            return "User already exist";
        }

        if (user) {
            await usersModel.findByIdAndUpdate(user._id, { Password: password });
            return "Password updated successfully.";
        } else {
            return { error: "Username does not exist" };
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return { error: "An error occurred while updating the user." };
    }
}


module.exports = { userLogIn , newUser};
