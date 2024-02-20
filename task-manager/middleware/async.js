const asyncWrapper = (resolveFunction) => {
    return async (req, res, next) => {
        try {
            resolveFunction(req, res);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper