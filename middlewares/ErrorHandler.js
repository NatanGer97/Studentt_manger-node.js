

const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    console.log(err.message);
};

module.exports = errorHandler;