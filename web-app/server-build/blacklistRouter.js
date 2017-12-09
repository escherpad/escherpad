"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function blackListRouter(regex, handler) {
    return function blackList(req, res, next) {
        if (req.url.match(regex)) next();else handler(req, res, next);
    };
}
exports.blackListRouter = blackListRouter;
//# sourceMappingURL=blacklistRouter.js.map