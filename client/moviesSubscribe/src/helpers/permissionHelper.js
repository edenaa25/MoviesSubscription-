import React from 'react';
import { useSelector } from 'react-redux';

export const checkPermission = (requiredPermission, fallbackMessage = 'You do not have permission to view this content.') => {
    const permissions = useSelector(state => state.users.permissions);

    return (Component) => {
        if (!permissions.includes(requiredPermission)) {
            return <p>{fallbackMessage}</p>;
        }
        return <Component />;
    };
};