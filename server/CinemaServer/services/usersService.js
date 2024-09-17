const usersRep = require("../repositories/usersRep")
const permissionsRep = require("../repositories/permissionsRep")
const userModel = require("../models/usersModel")

const getAllUsersWithPermissions  = async()=>{
    try{
        const {users} = await usersRep.getUsers()
        const {permissions} = await permissionsRep.getPermissions()
        const usersFromDb = await userModel.find({})
        const usersWithPermissions = users.map(user =>{
            const userPermissions = permissions.find(permission => permission.Id === user.Id)
            const userFromDb = usersFromDb.find(userDb => userDb._id.toString() === user.Id )
            return {
                ...user,
                UserName : userFromDb?.UserName,
                Permissions:  userPermissions ? userPermissions.Permissions : []
            }
        })
        return usersWithPermissions
    }catch(error){
        console.error("Error retrieving users with permissions:", error);
        throw error;
    }
   
}


const getUserById = async(id)=>{
    try{
        const {users} = await usersRep.getUsers()
        const user = users.find(user => user.Id === id)
        return user
    }catch(error){
        console.error("Error getUserById:", error);
        throw error;
    }
   
}

//newData: {Fname: , Lname: , SessionTimeOut: , Permissions: , userName:}
const editUser = async (id, newData) => {
    try {
        console.log(newData)
        await isUniqueUsername(newData.UserName)

        const { users } = await usersRep.getUsers();
        const {permissions} = await permissionsRep.getPermissions()
        const userFromDb = await userModel.findById(id)

        const userIndex = users.findIndex(user => user.Id === id);
        const userPermissionIndex = permissions.findIndex(permission => permission.Id === id);


        if (userIndex === -1) {
            throw new Error(`User with ID ${id} not found in users file`);
        }

        if (userPermissionIndex === -1) {
            throw new Error(`User with ID ${id} not found in permissions file`);
        }

        if (!userFromDb) {
            throw new Error(`User with ID ${id} not found in DB`);
        }

        users[userIndex] = {
            ...users[userIndex],
            Fname: newData.Fname, Lname: newData.Lname, SessionTimeOut: newData.SessionTimeOut
        };

        permissions[userPermissionIndex] = {
            ...permissions[userPermissionIndex],
            Permissions: newData.Permissions
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, { UserName: newData.UserName }, { new: true });

        if (!updatedUser) {
            throw new Error(`Failed to update user with ID ${id} in DB`);
        }
        await usersRep.setUsers({ users });

        await permissionsRep.setPermissions({permissions})

        return `User with ID ${id} updated successfully`;
    } catch (error) {
        console.error("Error editing user:", error);
        throw error;
    }
};

//inner function for checking unique username in users collection in DB
const isUniqueUsername = async (username) => {
    const findUser = await userModel.findOne({ UserName: username })
    if (findUser) {
        throw new Error('Username already exists, please try another one')
    }

    return true; // If no user is found, the username is unique
};

//newData: {Fname: , Lname: , SessionTimeOut: , Permissions: , UserName:}
const addUser = async (newData) =>{
    try{
        await isUniqueUsername(newData.UserName);
        //first- add user to mongo DB and get his _id for add data to the json files
        const newUserInDb = new userModel({ UserName: newData.UserName , Password: ""});
        const savedUser = await newUserInDb.save();
        const newUserId = savedUser._id;

        let { users } = await usersRep.getUsers();
        let {permissions} = await permissionsRep.getPermissions()

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

        users = [...users , {
            Id : newUserId,
            Fname : newData.Fname,
            Lname : newData.Lname,
            CreatedDate :formattedDate,
            SessionTimeOut : newData.SessionTimeOut
        }]

        permissions = [...permissions, {
            Id : newUserId,
            Permissions : newData.Permissions
        }]

        await usersRep.setUsers({ users });

        await permissionsRep.setPermissions({permissions})

        return `New user with ID ${newUserId} add successfully`;

    }catch(error){
        console.error("Error add new user:", error);
        throw error;
    }
}

const getSessionTimeOutById = async(id)=>{
    try{
        const {users} = await usersRep.getUsers()
        const userData = users.find(user => user.Id === id);
        return userData.SessionTimeOut
    }catch(error){
        console.error("Erro rgetSessionTimeOutById:", error);
        throw error;
    }
    
}

const deleteUser = async(userId)=>{
    try{
        let { users } = await usersRep.getUsers();
        let {permissions} = await permissionsRep.getPermissions()

        users = users.filter(user => user.Id !== userId)
        permissions = permissions.filter(perm => perm.Id !==userId)

        await userModel.findByIdAndDelete(userId)

        await usersRep.setUsers({ users });
        await permissionsRep.setPermissions({permissions})

        return `User with ID ${userId} Deleted successfully`;

    }catch(error){
        console.error("Error delete  user:", error);
        throw error;
    }
}

//the admin is the first user that created
const getAdminUserId = async()=>{
    try{
        const {users} = await usersRep.getUsers()
        const admin = users.reduce((earliest, current) => {
            return Date.parse(current.CreatedDate) < Date.parse(earliest.CreatedDate) ? current : earliest;
          }, users[0]);
        return admin.Id

    }catch(error){
        console.error("Error get admin id:", error);
        throw error;
    }
}

module.exports = {deleteUser, getAllUsersWithPermissions , editUser , addUser , getSessionTimeOutById , getUserById , getAdminUserId};
