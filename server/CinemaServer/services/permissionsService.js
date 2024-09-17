const permissionsRep = require("../repositories/permissionsRep")

const getUserPermissions = async(userId)=>{
    try{
        const {permissions} = await permissionsRep.getPermissions()
        const userPermissions = permissions.find(userPermissions => userPermissions.Id === userId)      
        return userPermissions.Permissions
    }
  catch(error){
    console.error("Error get user permissions", error);
    throw error;
   }
}


module.exports = {getUserPermissions}