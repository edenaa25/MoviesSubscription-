import { getAllUsersWithPermission } from '../Services/usersService';

const fetchUsers =() => async (dispatch) => {
        try {
            const users = await getAllUsersWithPermission();
            dispatch({ type: 'LOAD_USERS', payload: users });

            //save permissions for the user that loged in
            const userId = sessionStorage.getItem('id');
            const currUser = users.find(user => user.Id === userId)
            dispatch({ type: 'SET_PERMISSIONS', payload: currUser.Permissions});
        } catch (error) {
            console.error('Fetch users failed:', error.message);
        }
}


const handlePermissionsChange = (e, permissions)=>{
    const {checked,value} = e.target 
    let updatePermissions = checked ? [...permissions,value] 
    : permissions.filter(permission => permission !== value);

    updatePermissions =  addAutoViewPermission(updatePermissions)
    return updatePermissions
}

const addAutoViewPermission = (Permissions)=>{
    let afterAddPermissions = [...Permissions]
    const checkAndAddPermission = (createPerm, updatePerm, deletePerm, viewPerm) => {
        if (Permissions.includes(createPerm) && Permissions.includes(updatePerm) && Permissions.includes(deletePerm) && !Permissions.includes(viewPerm)) {
            afterAddPermissions.push(viewPerm);
        }
    };

    checkAndAddPermission('Create Subscriptions', 'Update Subscriptions', 'Delete Subscriptions', 'View Subscriptions');
    checkAndAddPermission('Create Movies', 'Update Movies', 'Delete Movies', 'View Movies');

    return afterAddPermissions
}



export { handlePermissionsChange , fetchUsers }