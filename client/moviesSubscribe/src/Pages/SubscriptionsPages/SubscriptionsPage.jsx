import React from 'react';
import { useNavigate ,Outlet} from "react-router-dom";
import { useSelector ,useDispatch } from 'react-redux';

function Members(){
    const navigate = useNavigate()
    const permissions = useSelector(state => state.users.permissions)
    const hasViewSubscriptionsPermission = permissions.includes('View Subscriptions');
    const hasCreateSubscriptionsPermission = permissions.includes('Create Subscriptions');


    if (!hasViewSubscriptionsPermission) {
        return <p>You do not have permission to view subscriptions.</p>;
    }


    return(
        <div>
            <h1>Subscriptions</h1>
            <button onClick={()=>navigate(`../subscriptions`)}>All members</button>
            {
                hasCreateSubscriptionsPermission &&
                <button onClick={()=>navigate(`addMember`)}>Add Member</button>

            }
            <br/> <br/>
            <Outlet />
        </div>
       
    )
}


export default Members;
