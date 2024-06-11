const searchHistoryMiddleware = (req, res, next) => {
    if (!req.session.searchHistory) {
        req.session.searchHistory = [];
    }

    const location_id = req.params.location_id;
    if (location_id) {

        req.session.searchHistory = req.session.searchHistory.filter(id => id !== location_id);
        
        req.session.searchHistory.unshift(location_id);

        if (req.session.searchHistory.length > 10) {
            req.session.searchHistory.pop();
        }
    }

    next();
};

module.exports = searchHistoryMiddleware;