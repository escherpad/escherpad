function blackListRouter(regex, handler) {
    return function blackList(req, res, next){
        if (req.url.match(regex)) next();
        else handler(req, res, next);
    }
}
export {blackListRouter}