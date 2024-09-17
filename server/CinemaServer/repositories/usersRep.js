const jFile = require("jsonfile")
const path = require("path")

const FILE = path.join(__dirname, "../files/Users.json" )

const getUsers = async () => {
    try {
        return await jFile.readFile(FILE);
    } catch (error) {
        console.error("Error reading Users.json:", error);
        throw error;
    }
};

const setUsers = async (newData) => {
    try {
        await jFile.writeFile(FILE, newData);
        return "Users data saved to file...";
    } catch (error) {
        console.error("Error writing to Users.json:", error);
        throw error;
    }
};



module.exports = {getUsers,setUsers}