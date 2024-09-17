const jFile = require("jsonfile")
const path = require("path")

const FILE = path.join(__dirname, "../files/Permissions.json" )

const getPermissions = async () => {
    try {
        return await jFile.readFile(FILE);
    } catch (error) {
        console.error("Error reading Permissions.json:", error);
        throw error;
    }
};

const setPermissions = async (newData) => {
    try {
        await jFile.writeFile(FILE, newData);
        return "Permissions data saved to file...";
    } catch (error) {
        console.error("Error writing to Permissions.json:", error);
        throw error;
    }
};

module.exports = {getPermissions,setPermissions}