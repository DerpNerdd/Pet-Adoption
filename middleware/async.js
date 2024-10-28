const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error("Async Wrapper Error:", error);  // Log the full error details
            next(error);  // Pass error to the next middleware
        }
    }
};

module.exports = asyncWrapper;
