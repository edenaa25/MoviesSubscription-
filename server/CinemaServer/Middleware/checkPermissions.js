const checkPermissions = (requiredPermissions) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions;
        const isAdmin = req.user.isAdmin;

        if (isAdmin) {
            return next(); // Admins bypass permission checks
        }

        const hasPermissions = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        if (!hasPermissions) {
            return res.status(403).json({ message: 'Access denied. You do not have the required permissions.' });
        }

        next(); // User has permissions, proceed to the next middleware or route handler
    };
};

module.exports = checkPermissions;