import {useSelector} from 'react-redux'

const checkPermission = (permissionCheck)=>{
    const permissions = useSelector(state => state.users.permissions)
    if(permissions.includes(permissionCheck)){
        return true
    }
    else{
        return false
    }
    
}

export {checkPermission}