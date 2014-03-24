
/**
 * Custom middleware used by the application
 */
    /**
     *  Protect routes on your api from unauthenticated access
     */
export function auth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
}

/**
 * Set a cookie for angular so it knows we have an http session
 */
export function setUserCookie(req, res, next) {
    if(req.user) {
        res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
}
